import { Component, Input } from '@angular/core';
import { Terminal } from '@core/models/terminal.model';

@Component({
  selector: 'app-card-terminal',
  templateUrl: './card-terminal.component.html',
})
export class CardTerminalComponent {
  @Input() terminal!: Terminal;

  getStatusClass(terminal: Terminal): string {
    if (terminal.Active && terminal.Available) {
      return 'bg-primary-subtle text-primary';
    }
    return 'bg-secondary-subtle text-secondary';
  }
}
