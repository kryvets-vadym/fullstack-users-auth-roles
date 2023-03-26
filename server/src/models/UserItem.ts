import { Schema, model } from 'mongoose';

export interface UserItemI {
  userId: number,
  name: string,
  username: string,
  email: string,
  address: {
    street: string,
    city: string,
    zipcode: string,
  },
  phone: string,
  website: string,
  companyName: string
}

const UserItem = new Schema<UserItemI>({
    userId: Number,
    name: String,
    username: String,
    email: String,
    address: {
      street: String,
      city: String,
      zipcode: String,
    },
    phone: String,
    website: String,
    companyName: String
  },
  {
    timestamps: true,
  }
);

export default model<UserItemI>('UserItem', UserItem);
