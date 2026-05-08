import { StockModel } from "./model/StockModel";
import { View } from "./view/View";
import { StockController } from "./controller/StockController";

// Instanciação das camadas do MVC
const stockModel = new StockModel("PETR4", 36.50);
const stockView = new View();
const stockController = new StockController(stockModel, stockView);

// Exibição inicial sem padrão Observer
console.log(`--- SISTEMA DE MONITORAMENTO DE AÇÕES INICIADO ---`);
stockView.display(stockModel.getTicker(), stockModel.getPrice());

// Simulando atualizações vindas do mercado financeiro e passando pelo Controller
setTimeout(() => {
  stockController.updatePrice(37.20);
}, 1000);

setTimeout(() => {
  // Testando a validação do controller
  stockController.updatePrice(-5.00); 
}, 2000);

setTimeout(() => {
  stockController.updatePrice(36.80);
}, 3000);
