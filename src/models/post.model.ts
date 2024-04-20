import {
  PaymentMethodType,
  PostType,
  RequirementType,
  TaskType,
} from "@/utils/enum";
import mongoose, { Document, Schema } from "mongoose";
// task

export interface TaskModel extends Document {
  title: string;
  description: string;
  type: string;
  process: number;
}
const TaskSchema: Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desciption: {
      type: String,
      required: true,
    },
    process: {
      type: Number,
      required: true,
      default: 0,
    },
    type: {
      enum: TaskType,
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
// requirement
export interface RequirementDto {
  title: string;
  description: string;
  type: string;
}
export interface RequirementModel extends Document {
  title: string;
  description: string;
  type: string;
}
const RequirementSchema: Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    desciption: {
      type: String,
      required: true,
    },
    type: {
      enum: RequirementType,
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// post

export interface PostDto {
  _id: string;
  created: string;
  number: number;
  requirements: [RequirementDto];
  verified: boolean;
  title: string;
  description: string;
  professions: [string];
  type: string;
  paymentMethod: string;
}

export interface PostModel extends Document {
  created: string;
  number: number;
  requirements: [RequirementDto];
  verified: boolean;
  title: string;
  description: string;
  professions: [string];
  type: string;
  paymentMethod: string;
}

const PostSchema: Schema = new mongoose.Schema(
  {
    deadline: {
      type: Date,
    },
    payment: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: PaymentMethodType,
    },
    created: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
        required: true,
      },
    ],
    number: {
      type: Number,
      required: true,
      default: 1,
    },
    requirements: [RequirementSchema],
    verified: {
      type: Boolean,
      default: false,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    professions: [
      {
        type: String,
      },
    ],
    tasks: [TaskSchema],
    type: {
      type: String,
      required: true,
      enum: PostType,
    },
  },
  { timestamps: true }
);

const Post =
  mongoose.models.Post || mongoose.model<PostModel>("Post", PostSchema);

export default Post;
