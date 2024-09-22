interface CurrencyData {
  VND: number;
  USDT: number | string;
}

export interface UserBalance {
  main: CurrencyData;
  promo: CurrencyData;
  affiliate: CurrencyData;
}
