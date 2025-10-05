export interface AddressModel {
  id: string;
  userId: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  city: string;
  zipCode: string;
  country: string;
  createAt: CreateAt;
  updateAt: UpdateAt;
  default: boolean;
}

export interface CreateAt {
  _seconds: number;
  _nanoseconds: number;
}

export interface UpdateAt {
  _seconds: number;
  _nanoseconds: number;
}
