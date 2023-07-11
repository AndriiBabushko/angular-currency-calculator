import { Component, OnInit } from '@angular/core';
import { IExchange } from '../../models/Exchange';
import { ExchangeService } from '../../services/exchange.service';

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

  constructor(private exchangeService: ExchangeService) {}

  ngOnInit() {
    this.fetchExchangeRates();
  }

  fetchExchangeRates() {
    this.exchangeService.getExchange('USD').subscribe((response) => {
      console.log('Calculator exchange rates fetched!');
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
