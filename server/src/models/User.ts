import { Schema, model } from 'mongoose';

export interface UserI {
  email: string,
  username: string,
  password: string,
  role: string,
  isActivated: boolean,
  activationLink: string | null,
}

const User = new Schema<UserI>(
  {
    email: {
      type: String,
      unique: true,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      default: 'USER',
      enum: ['USER', 'ADMIN', 'PAIRED', 'UNPAIRED'],
    },
    isActivated: {
      type: Boolean,
      default: false,
    },
    activationLink: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default model<UserI>('User', User);
