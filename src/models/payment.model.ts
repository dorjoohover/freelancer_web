import { PaymentMethodType } from "@/utils/enum";
import mongoose, { Schema } from "mongoose";

export interface PaymentDto {
  _id: string;
  amount: number;
  type: string;
  verified: boolean;
}
export interface PaymentModel extends Document {
  amount: number;
  type: string;
  verified: boolean;
}
const PaymentSchema: Schema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    type: {
      enum: PaymentMethodType,
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);

const Payment =
  mongoose.models.Payment ||
  mongoose.model<PaymentModel>("Payment", PaymentSchema);

export default Payment;
