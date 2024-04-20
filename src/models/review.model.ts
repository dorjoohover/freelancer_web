import { TaskType } from "@/utils/enum";
import mongoose, { Schema } from "mongoose";

export interface ReviewDto {
  _id: string;
  question: string;
  answer: string;
  rating: number;
  key: string;
}
export interface ReviewModel extends Document {
  question: string;
  answer: string;
  rating: number;
  key: string;
}
const ReviewSchema: Schema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      default: 2,
    },
    key: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Review =
  mongoose.models.Review || mongoose.model<ReviewModel>("Review", ReviewSchema);

export default Review;
