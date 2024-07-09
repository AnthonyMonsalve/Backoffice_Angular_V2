import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-message',
  templateUrl: './card-message.component.html',
})
export class CardMessageComponent {
  @Input() title!: string;
  @Input() message!: string;
}
