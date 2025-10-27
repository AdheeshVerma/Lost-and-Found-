import { Schema, model } from 'mongoose';

const complaintSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['open', 'in_progress', 'resolved', 'closed'],
      default: 'open',
    },
    attachments: [
      {
        url: { type: String, required: true },
        filename: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

complaintSchema.index({ title: 'text', description: 'text' });

export default model('Complaint', complaintSchema);
