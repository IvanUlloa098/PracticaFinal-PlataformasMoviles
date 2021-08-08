import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-titulos-paginas',
  templateUrl: './titulos-paginas.component.html',
  styleUrls: ['./titulos-paginas.component.scss'],
})
export class TitulosPaginasComponent implements OnInit {

  @Input() tituloPagina:  string;

  constructor() { }

  ngOnInit() {}

}
