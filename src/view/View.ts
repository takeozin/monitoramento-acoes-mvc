import { Observer } from "../model/StockModel";

export class View implements Observer {
  private tickerDisplay: HTMLElement;
  private priceDisplay: HTMLElement;
  private changeDisplay: HTMLElement;
  private trendIcon: SVGElement;
  private stockCard: HTMLElement;
  
  private lastPrice: number = 0;

  constructor() {
    this.tickerDisplay = document.getElementById("ticker-display") as HTMLElement;
    this.priceDisplay = document.getElementById("price-display") as HTMLElement;
    this.changeDisplay = document.getElementById("change-display") as HTMLElement;
    this.trendIcon = document.getElementById("trend-icon") as any as SVGElement;
    this.stockCard = document.getElementById("stock-card") as HTMLElement;
  }

  // A View implementa a atualização para reagir quando o Model muda
  update(ticker: string, price: number): void {
    this.display(ticker, price);
  }

  // Interação rica via DOM
  public display(ticker: string, price: number): void {
    this.tickerDisplay.textContent = ticker;
    this.priceDisplay.textContent = price.toFixed(2);

    if (this.lastPrice === 0) {
      this.lastPrice = price;
      return;
    }

    const difference = price - this.lastPrice;
    
    // Resetar animações
    this.stockCard.classList.remove('anim-up', 'anim-down');
    void this.stockCard.offsetWidth; // Trigger reflow

    if (difference > 0) {
      this.priceDisplay.className = "stock-price price-up";
      this.changeDisplay.textContent = `+ R$ ${difference.toFixed(2)} (Subindo)`;
      this.changeDisplay.className = "price-up";
      this.trendIcon.innerHTML = `<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline>`;
      this.trendIcon.style.color = "var(--success-color)";
      this.stockCard.classList.add('anim-up');
    } else if (difference < 0) {
      this.priceDisplay.className = "stock-price price-down";
      this.changeDisplay.textContent = `- R$ ${Math.abs(difference).toFixed(2)} (Caindo)`;
      this.changeDisplay.className = "price-down";
      this.trendIcon.innerHTML = `<polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline>`;
      this.trendIcon.style.color = "var(--danger-color)";
      this.stockCard.classList.add('anim-down');
    }

    this.lastPrice = price;
  }

  // Método utilitário para exibir mensagens de erro no front-end
  public showError(msg: string): void {
    const errorEl = document.getElementById("error-message");
    if (errorEl) {
      errorEl.textContent = msg;
      errorEl.classList.add("visible");
      setTimeout(() => errorEl.classList.remove("visible"), 3000);
    }
  }
}
