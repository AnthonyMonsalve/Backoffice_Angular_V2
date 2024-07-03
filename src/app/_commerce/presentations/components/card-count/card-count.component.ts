import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'card-count',
  templateUrl: './card-count.component.html',
})
export class CardCountComponent implements OnInit {
  @Input() title: string = ''; // Título para la tarjeta
  @Input() icon: string = ''; // Ícono para mostrar
  @Input() count: number = 0;
  @Input() link: string = '/'; // Contador para mostrar

  constructor() {}

  ngOnInit(): void {}
}
