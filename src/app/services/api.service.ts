import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  baseUrl = environment.apiUrl;

  getHistory() {
    return this.http.get(
      `${this.baseUrl}/gamehistory?page=0&pageSize=5&search=&wallet=main&betResult=win&fromDate=20240824&toDate=20240828&userId=`,
    );
  }

  getHistoryDetails() {
    return this.http.get(
      `${this.baseUrl}/gamehistory/863a776d-116e-4407-b8c7-c69a9ffc7504`,
    );
  }

  getJackpotWinner() {
    return this.http.get(`${this.baseUrl}/jackpot/getJackpotWinner`);
  }

  joinRoom() {
    return this.http.post(`${this.baseUrl}/gameworker/room`, {});
  }

  placeOrder() {
    return this.http.get(`${this.baseUrl}/gameworker/order`);
  }

  outRoom() {
    return this.http.delete(`${this.baseUrl}/gameworker/room`);
  }

  betRewardSender() {
    return this.http.post(`${this.baseUrl}/bet/results`, {});
  }
}
