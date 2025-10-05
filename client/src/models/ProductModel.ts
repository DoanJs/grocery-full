export interface ProductModel {
  id: string;
  category: string;
  description: string;
  price: number;
  quantity: string;
  sale: string;
  star: number;
  title: string;
  url: string;
  createAt: CreateAt;
  updateAt: UpdateAt;
}

export interface CreateAt {
  _seconds: number;
  _nanoseconds: number;
}

export interface UpdateAt {
  _seconds: number;
  _nanoseconds: number;
}
