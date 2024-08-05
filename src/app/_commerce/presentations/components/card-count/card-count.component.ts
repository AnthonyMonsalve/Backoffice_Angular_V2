import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'card-count',
  templateUrl: './card-count.component.html',
})
export class CardCountComponent implements OnInit {
  @Input() title: string = ''; // Título para la tarjeta
  @Input() icon: string = ''; // Ícono para mostrar
  @Input() count: number = 0;
  @Input() link: string = '/'; // Contador para mostrar
  @Input() isLoading: boolean = true;
  showLoad: boolean = true;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isLoading']) {
      this.showLoad = true;
      if (!this.isLoading) {
        this.showLoad = false;
      }
    }
  }
}
