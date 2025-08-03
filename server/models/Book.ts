import mongoose, { Document, Schema } from 'mongoose';

export interface IBook extends Document {
  name: string;
  author: string;
  pages: number;
}

const BookSchema: Schema = new Schema<IBook>({
  name: { type: String, required: true },
  author: { type: String, required: true },
  pages: { type: Number, required: true }
});

export const Book = mongoose.model<IBook>('Book', BookSchema);
