import mongoose from 'mongoose';

export const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },

  url: { type: String, required: true },

  likes: { type: Number, default: 0 },
});

export class Posts {
  title: string;

  url: string;

  likes: number;
}
