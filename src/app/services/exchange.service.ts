import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IExchange } from '../models/Exchange';

@Injectable({
  providedIn: 'root',
})
export class ExchangeService {
  constructor(private http: HttpClient) {}

  getExchange(base: string) {
    return this.http.get<IExchange>(
      `https://api.exchangerate.host/latest?base=${base}`
    );
  }
}
