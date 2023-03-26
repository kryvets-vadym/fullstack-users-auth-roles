import mongoose, { Schema, model } from 'mongoose';

export interface TokenI {
  user: mongoose.Types.ObjectId,
  refreshToken: string,
}

const Token = new Schema<TokenI>({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  refreshToken: { type: String, required: true },
});

export default model<TokenI>('Token', Token);
