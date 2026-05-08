import { StockModel } from "./model/StockModel";
import { View } from "./view/View";
import { StockController } from "./controller/StockController";

// Aguarda o DOM carregar
document.addEventListener("DOMContentLoaded", () => {
  // Instanciação das camadas do MVC
  const stockModel = new StockModel("PETR4", 36.50);
  const stockView = new View();
  const stockController = new StockController(stockModel, stockView);

  // Inicialização (Setup inicial sem acionar log de variação)
  stockView.display(stockModel.getTicker(), stockModel.getPrice());

  // Conectando os eventos da Web aos métodos do Controller
  const btnDecrease = document.getElementById("btn-decrease");
  const btnIncrease = document.getElementById("btn-increase");

  btnDecrease?.addEventListener("click", () => {
    const newPrice = stockModel.getPrice() - 0.50;
    
    // Simulamos a View capturando uma entrada do usuário e repassando para o controller
    // Na nossa versão original o erro era console.log. Vamos estender o controller ou capturar a falha.
    // Mas para manter simples, mandamos o updatePrice e se não subir, a gente trata o erro na view.
    if (newPrice <= 0) {
      stockView.showError("O preço da ação não pode ser menor ou igual a zero.");
    } else {
      stockController.updatePrice(newPrice);
    }
  });

  btnIncrease?.addEventListener("click", () => {
    const newPrice = stockModel.getPrice() + 0.50;
    stockController.updatePrice(newPrice);
  });

  // Simulação automática (opcional, apenas para dar aquele efeito vivo!)
  setInterval(() => {
    // 30% de chance de mudar o preço sozinho (mercado maluco)
    if (Math.random() > 0.7) {
      const variacao = (Math.random() * 2) - 1; // Entre -1 e 1
      const novoPreco = Math.max(0.1, stockModel.getPrice() + variacao);
      stockController.updatePrice(novoPreco);
    }
  }, 4000);

});
