import { Component, Input } from '@angular/core';
import { MultiDataSet, Label, Color } from 'ng2-charts';


@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html'
})
export class DonutComponent {

  @Input() title: string = 'Sin título';
  @Input( 'labels' ) public doughnutChartLabels: Label[] = ['Label1', 'Label2', 'Label3'];
  @Input( 'data' ) public doughnutChartData: MultiDataSet = [
    [350, 450, 100]
  ];

  public colors: Color[] = [
    { backgroundColor: [ '#6857E6', '#009FEE', '#F02059' ] }
  ];

}
