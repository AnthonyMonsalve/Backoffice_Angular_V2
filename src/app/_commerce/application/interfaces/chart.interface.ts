export interface Closure {
  date: {
    dateTime: string;
  };
  closure: {
    totalGross: number;
    total_txn: number;
    qty_closures: number;
  };
}

export interface ChartClosureData {
  closures: Closure[];
}

export interface ChartOverviewData {
  totalAmount: {
    TotalAmountGross: number;
    CountClosures: number;
    TotalQTY: number;
  };
}
