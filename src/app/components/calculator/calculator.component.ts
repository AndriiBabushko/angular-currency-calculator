import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IExchange } from '../../models/Exchange';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
})
export class CalculatorComponent implements OnInit {
  exchangeRates!: IExchange;
  currencies!: string[];
  firstSelectedCurrency: string = 'UAH';
  secondSelectedCurrency: string = 'USD';
  firstMoneyAmount: number = 0;
  secondMoneyAmount: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchExchangeRates();
  }

  fetchExchangeRates() {
    this.http
      .get<IExchange>('https://api.exchangerate.host/latest?base=USD')
      .subscribe((response) => {
        console.log('Exchange rates fetched!');
        this.exchangeRates = response;
        this.currencies = Object.keys(response.rates);
        this.convertCurrency();
      });
  }

  convertCurrency() {
    if (
      this.firstMoneyAmount &&
      this.firstSelectedCurrency &&
      this.secondSelectedCurrency
    ) {
      const firstRate = this.exchangeRates.rates[this.firstSelectedCurrency];
      const secondRate = this.exchangeRates.rates[this.secondSelectedCurrency];

      if (firstRate && secondRate) {
        this.secondMoneyAmount =
          Math.round(((this.firstMoneyAmount * secondRate) / firstRate) * 100) /
          100;
        console.log(this.secondMoneyAmount);
      }
    }
  }

  formatCurrency(amount: number): string {
    return amount.toFixed(2);
  }

  preventNegativeInput(event: KeyboardEvent) {
    if (event.key === '-') event.preventDefault();
  }

  changeCurrencies() {
    [this.firstSelectedCurrency, this.secondSelectedCurrency] = [
      this.secondSelectedCurrency,
      this.firstSelectedCurrency,
    ];
    this.convertCurrency();
  }
}
