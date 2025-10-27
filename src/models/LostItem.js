import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const LostItemSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    dateLost: { type: Date, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
      type: String,
      enum: ['lost', 'found', 'claimed'],
      default: 'lost',
    },
  },
  { timestamps: true }
);

LostItemSchema.index({ title: 'text', description: 'text' });

export default model('LostItem', LostItemSchema);
