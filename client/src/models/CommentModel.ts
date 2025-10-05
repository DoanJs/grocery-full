export interface CommentModel {
  id: string;
  productId: string;
  star: number;
  text: string;
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
