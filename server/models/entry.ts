import { Schema, model } from 'mongoose';

const entrySchema = new Schema(
  {
    content: String,
  },
  { timestamps: true }
);

export default model('Entry', entrySchema);
