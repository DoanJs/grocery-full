export interface CartModel {
  id: string;
  productId: string;
  quantity: number;
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