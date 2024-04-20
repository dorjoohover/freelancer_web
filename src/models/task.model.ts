import { TaskType } from "@/utils/enum";
import mongoose, { Schema } from "mongoose";

export interface TaskDto {
  _id: string;
  title: string;
  description: string;
  type: string;
  process: number;
}
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

const Task =
  mongoose.models.Task || mongoose.model<TaskModel>("Task", TaskSchema);

export default Task;
