import { Observer } from "../model/StockModel";

export class View implements Observer {
  // A View implementa a atualização para reagir quando o Model muda
  update(ticker: string, price: number): void {
    this.display(ticker, price);
  }

  // Interface minimalista
  public display(ticker: string, price: number): void {
    console.log(`\n============================`);
    console.log(`📈 ATUALIZAÇÃO DE AÇÃO`);
    console.log(`============================`);
    console.log(`Ticker: ${ticker}`);
    console.log(`Preço atual: R$ ${price.toFixed(2)}`);
    console.log(`============================\n`);
  }
}
