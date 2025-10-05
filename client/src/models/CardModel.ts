export interface CardModel {
  id: string;
  userId: string;
  type: string;
  url: string;
  name: string;
  number: string;
  exp: string;
  cvv: string;
  default: boolean;
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
