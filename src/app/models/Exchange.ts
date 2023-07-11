export interface IExchange {
  success: boolean;
  base: string;
  date: string;
  rates: {
    [currencyCode: string]: number;
  };
}
