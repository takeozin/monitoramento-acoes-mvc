import { StockModel } from "../model/StockModel";
import { View } from "../view/View";

export class StockController {
  private model: StockModel;
  private view: View;

  constructor(model: StockModel, view: View) {
    this.model = model;
    this.view = view;
    
    // Opcionalmente registrar a view no model caso isso seja responsabilidade do controller de orquestrar
    this.model.addObserver(this.view);
  }

  // Valida e atualiza o preço
  public updatePrice(newPrice: number): void {
    if (newPrice <= 0) {
      console.error(`[Erro de Validação] O preço da ação ${this.model.getTicker()} não pode ser menor ou igual a zero.`);
      return;
    }

    console.log(`[Controller] Solicitando atualização do preço da ação ${this.model.getTicker()} para R$ ${newPrice.toFixed(2)}`);
    // Atualiza o model (o que por sua vez notifica a view automaticamente pelo padrão Observer)
    this.model.setPrice(newPrice);
  }
}
