import { Component, Input } from '@angular/core';
import { Affiliate } from '@core/models/affiliate.model';
import { Terminal } from '@core/models/terminal.model';

@Component({
  selector: 'app-card-terminal',
  templateUrl: './card-terminal.component.html',
})
export class CardTerminalComponent {
  @Input() terminal!: Terminal;
  @Input() affiliate!: Affiliate;

  getStatusClass(terminal: Terminal): string {
    if (terminal.Active) {
      return 'bg-primary-subtle text-primary';
    }
    return 'bg-secondary-subtle text-secondary';
  }
}
