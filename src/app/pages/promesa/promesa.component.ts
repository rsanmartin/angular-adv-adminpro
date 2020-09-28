import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesa',
  templateUrl: './promesa.component.html',
  styleUrls: ['./promesa.component.css']
})
export class PromesaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    this.getUsuarios().then(usuario => {
      console.log(usuario);
    });
    // const promesa = new Promise( ( resolve, reject ) => {
    //     //resolve('Hola Mundo');

    //     if ( false ) {
    //       resolve('Hola Mundo');
    //     } else {
    //       reject('Algo salió mal');
    //     }
    // });

    // promesa.then( (mensaje) => {
    //   console.log(mensaje);
    // })
    // .catch( error => console.log('Error en mi promesa', error) );

    // console.log('Fin del init');
  }

  getUsuarios(){
    return new Promise( resolve => {
      fetch('https://reqres.in/api/users')
      .then( resp => resp.json())
      .then( body => console.log(body.data));
    });
  }

}
