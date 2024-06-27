import { Terminal } from '../../domain/models/terminal.model';

export interface Overview {
  count: number;
  activeCount: number;
  inactiveCount: number;
  data: Terminal[];
}
