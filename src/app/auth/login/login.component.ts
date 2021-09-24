import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators ,FormGroup} from '@angular/forms';
import { UsuarioService} from '../../services/usuario.service';
import Swal from 'sweetalert2'

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'
  ]
})
export class LoginComponent implements OnInit{

  public formSubmitted = false;
  public auth2: any;

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    remember: [false]
  });

  
  constructor(private router: Router,private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private ngZone: NgZone ) { }

  ngOnInit(): void {
    this.renderButton();
  }

  login(){
    //console.log(this.loginForm.value);
    //this.router.navigateByUrl('/');
    this.formSubmitted = true;
    console.log (this.loginForm.value);

    if (this.loginForm.invalid) {
      return;
    } 

    this.usuarioService.login(this.loginForm.value).subscribe( resp => {
      //console.log( 'usuario creado' )
      //console.log (resp);
      if ( this.loginForm.get('remember').value ) {
        localStorage.setItem('email', this.loginForm.get('email').value);
      } else {
        localStorage.removeItem('email');
      }
      this.router.navigateByUrl('/');

    }, (err) => {
      //si sucede un error
      Swal.fire('Error', err.error.msg,'error');
    });
  }

  campoNoValido( campo: string ) : boolean{

    if(this.loginForm.get(campo).invalid && this.loginForm) {
      return true;
    } else {
      return false;
    }

  }

  onSuccess(googleUser) {
    //console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    var id_token = googleUser.getAuthResponse().id_token;
    console.log(id_token);
  }

   onFailure(error) {
    console.log(error);
  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });

    this.startApp();
  }

  async startApp () {

    await this.usuarioService.googleInit();
    this.auth2 = this.usuarioService.auth2;
    this.attachSignin(document.getElementById('my-signin2'));
/*
    gapi.load('auth2', () => {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id: '192812156347-b49usoj84n6vvm79c5g39qonikj3edt7.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        // Request scopes in addition to 'profile' and 'email'
        //scope: 'additional_scope'
      });
      this.attachSignin(document.getElementById('my-signin2'));
    });*/
  }

  attachSignin(element) {
    console.log(element.id);
    this.auth2.attachClickHandler(element, {},
        (googleUser) => {
          const id_token = googleUser.getAuthResponse().id_token;
          this.usuarioService.loginGoogle(id_token)
          .subscribe( resp => {
            this.ngZone.run(() =>{
              this.router.navigateByUrl('/');
            });
          });
          
        }, function(error) {
          alert(JSON.stringify(error, undefined, 2));
        });
  }

}
