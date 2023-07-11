import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IExchange } from '../../models/Exchange';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  USDRate!: number;
  EURRate!: number;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchExchangeRates();
  }

  fetchExchangeRates() {
    this.http
      .get<IExchange>('https://api.exchangerate.host/latest?base=USD')
      .subscribe((response) => {
        console.log('USD NAVBAR RATE SUCCESS!');
        this.USDRate = response.rates['UAH'];
      });
    this.http
      .get<IExchange>('https://api.exchangerate.host/latest?base=EUR')
      .subscribe((response) => {
        console.log('EUR NAVBAR RATE SUCCESS!');
        this.EURRate = response.rates['UAH'];
      });
  }
}
