export interface AddBasketItemRequest {
  ProductId: number;
  BasketId?: string | number;
  quantity: number;
}

export interface BasketItemResponse {
  ProductId: number;
  BasketId: number | null;
  id: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}
