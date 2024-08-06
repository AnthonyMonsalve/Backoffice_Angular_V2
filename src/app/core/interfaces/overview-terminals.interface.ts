export interface OverviewTerminals {
  origen: string;
  terminals: {
    terminalCount: number;
    terminalActiveCount: number;
    terminalInactiveCount: number;
  };
}
