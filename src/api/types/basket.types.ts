export interface AddBasketItemRequest {
  ProductId: number;
  BasketId?: string | number;
  quantity: number;
}
