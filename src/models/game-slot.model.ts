export interface CurrencyData {
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

export interface WalletInfo {
  playMode: string;
  userBalance: number;
}

export interface AuthResponse {
  accessToken: string;
  balance: number;
  binanceId: string;
  email: string;
  enabledMfa: boolean;
  fullName: string;
  isVerified: boolean;
  iss: string;
  phoneNumber: string;
  refCode: string | null;
  refId: string | null;
  site: string;
  username: string;
}
