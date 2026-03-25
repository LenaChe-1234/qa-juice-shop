import { APIRequestContext } from "@playwright/test";
import { AuthService } from "./AuthService";
import { ProductsService } from "./ProductsService";
import { BasketService } from "./BasketSrvice";

export class ApiServices {
  readonly auth: AuthService;
  readonly products: ProductsService;
  readonly basket: BasketService;

  constructor(request: APIRequestContext) {
    this.auth = new AuthService(request);
    this.products = new ProductsService(request);
    this.basket = new BasketService(request);
  }
}
