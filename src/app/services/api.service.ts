import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserBalance } from '../models/game-slot.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  baseUrl = environment.apiUrl;

  getHistory() {
    return this.http.get(
      `https://gateway.api.jackpot2024.win/slot/api/gamehistory?page=0&pageSize=5&search=&wallet=main&betResult=win&fromDate=20240824&toDate=20240828&userId= `,
    );
  }

  getUserBalance() {
    return this.http.get<UserBalance>(`${this.baseUrl}/ext/user/userbalance`);
  }

  getHistoryDetails() {
    return this.http.get(`${this.baseUrl}/gamehistory`);
  }

  getJackpotWinner() {
    return this.http.get(`${this.baseUrl}/jackpot/getJackpotWinner`);
  }

  joinRoom(walletName: string) {
    return this.http.post(
      `https://gateway.api.jackpot2024.win/slot/api/gameworker/room`,
      {
        walletName,
      },
    );
  }

  placeOrder(betAmount: number) {
    return this.http.post(
      `https://gateway.api.jackpot2024.win/slot/api/gameworker/order`,
      {
        betAmount,
      },
    );
  }

  outRoom() {
    return this.http.delete(`${this.baseUrl}/gameworker/room`);
  }

  betRewardSender() {
    return this.http.post(`${this.baseUrl}/bet/results`, {});
  }
}
