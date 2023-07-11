import { Component, OnInit } from '@angular/core';
import { ExchangeService } from '../../services/exchange.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  USDRate!: number;
  EURRate!: number;

  constructor(private exchangeService: ExchangeService) {}

  ngOnInit() {
    this.fetchExchangeRates();
  }

  fetchExchangeRates() {
    this.exchangeService.getExchange('EUR').subscribe((response) => {
      console.log('EUR rate successfully fetched!');
      this.EURRate = response.rates['UAH'];
    });
    this.exchangeService.getExchange('USD').subscribe((response) => {
      console.log('USD rate successfully fetched!');
      this.USDRate = response.rates['UAH'];
    });
  }
}
