import { Component, Input } from '@angular/core';
import { Terminal } from '@core/models/terminal.model';

@Component({
  selector: 'app-group-of-terminals',
  templateUrl: './group-of-terminals.component.html',
})
export class GroupOfTerminalsComponent {
  @Input() terminals!: Terminal[];

  constructor() {}
}
