export interface OrderModel {
  id: string;
  method: string;
  cartIds: string[];
  addressId: string;
  cardId: string;
  userId: string;

  createAt?: CreateAt;
  updateAt?: UpdateAt;
}

export interface CreateAt {
  _seconds: number;
  _nanoseconds: number;
}

export interface UpdateAt {
  _seconds: number;
  _nanoseconds: number;
}
