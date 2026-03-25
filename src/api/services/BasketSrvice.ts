import { APIRequestContext } from "@playwright/test";
import { ApiClient } from "../clients/ApiClient";
import { AddBasketItemRequest } from "../types/basket.types";

export class BasketService extends ApiClient {
  constructor(request: APIRequestContext) {
    super(request);
  }

  async addItem(token: string, payload: AddBasketItemRequest) {
    return this.post("/api/BasketItems/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: payload,
    });
  }

  async getBasket(basketId: string | number, token?: string) {
    return this.get(`/rest/basket/${basketId}`, {
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : undefined,
    });
  }
}
