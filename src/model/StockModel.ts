// Interface para o padrão Observer
export interface Observer {
  update(ticker: string, price: number): void;
}

export class StockModel {
  private ticker: string;
  private price: number;
  private observers: Observer[] = [];

  constructor(ticker: string, initialPrice: number) {
    this.ticker = ticker;
    this.price = initialPrice;
  }

  // Permite adicionar observadores (ex: a View)
  addObserver(observer: Observer): void {
    this.observers.push(observer);
  }

  // Notifica todos os observadores sobre a mudança de preço
  private notifyObservers(): void {
    for (const observer of this.observers) {
      observer.update(this.ticker, this.price);
    }
  }

  public getTicker(): string {
    return this.ticker;
  }

  public getPrice(): number {
    return this.price;
  }

  public setPrice(newPrice: number): void {
    this.price = newPrice;
    // Opcionalmente podemos registrar isso em algum lugar, e notificar os observers
    this.notifyObservers();
  }
}
