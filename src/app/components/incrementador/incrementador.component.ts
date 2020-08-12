import { Component, EventEmitter} from '@angular/core';
import { Input, Output} from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent {

  @Input('valor') progreso: number = 50;
  //@Input() progreso: number = 50;
  @Output('valor') valorSalida: EventEmitter<number> = new EventEmitter();

   get getPorcentaje(){
     return `${this.progreso}%`;
   }

   cambiarValor( valor: number){
    if(this.progreso >= 100 && valor >= 0){
      this.valorSalida.emit(100);
      return  this.progreso = 100;
    }

    if(this.progreso <= 0 && valor < 0){
      this.valorSalida.emit(0);
      return  this.progreso = 0;
    }

    this.progreso = this.progreso + valor;
    this.valorSalida.emit(this.progreso);
   }

}
