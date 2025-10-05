import { FieldValue } from "@react-native-firebase/firestore";

export interface FulfillmentModel {
  id: string;
  orderId: string;
  placed: TimeAt | FieldValue;
  confirmed: TimeAt | FieldValue;
  shipped: TimeAt | FieldValue;
  delivery: TimeAt | FieldValue;
  delivered: TimeAt | FieldValue;

  createAt?: CreateAt;
  updateAt?: UpdateAt;
}

export interface TimeAt {
  _seconds: number;
  _nanoseconds: number;
}

export interface CreateAt {
  _seconds: number;
  _nanoseconds: number;
}

export interface UpdateAt {
  _seconds: number;
  _nanoseconds: number;
}
