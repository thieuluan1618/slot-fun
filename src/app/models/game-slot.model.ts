interface CurrencyData {
  VND: number;
  USDT: number | string;
}

export interface UserBalance {
  main: CurrencyData;
  promo: CurrencyData;
  affiliate: CurrencyData;
}

export interface BetResult {
  betResult: string;
  betResultType: number;
  betReward: number;
  userBalance: CurrencyData;
  userId: string;
}

export type WalletType = 'promo' | 'main';
