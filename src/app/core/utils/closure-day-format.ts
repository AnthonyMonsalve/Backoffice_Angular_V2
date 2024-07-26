import { ChartData } from '@commerce/application/interfaces/chart.interface';

export function ClosureDayFormat(
  data: any,
  startDate: string,
  endDate: string
): ChartData {
  if (data) {
    return data;
  }

  return {
    closures: [
      {
        date: {
          dateTime: new Date(startDate).toISOString(),
        },
        closure: {
          totalGross: 0,
          total_txn: 0,
          qty_closures: 0,
        },
      },
      {
        date: {
          dateTime: new Date(endDate).toISOString(),
        },
        closure: {
          totalGross: 0,
          total_txn: 0,
          qty_closures: 0,
        },
      },
    ],
  };
}
