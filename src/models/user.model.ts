import { UserType, SocialType, BusinessType } from "@/utils/enum";
import mongoose, { Document, Schema } from "mongoose";

// user info
export interface UserInfoDto {
  registerNumber?: string;
  phone: string;
  email: string;
  name: string;
  profession: string;
}
export interface UserInfoModel extends Document {
  registerNumber?: string;
  phone?: string;
  email?: string;
  name?: string;
  profession?: string;
}

// business info
export interface ClientInfoDto {
  registerNumber?: string;
  companyRegisterNumber?: string;
  phone: string;
  email: string;
  type: string;
  name: string;
}
export interface ClientInfoModel extends Document {
  registerNumber?: string;
  companyRegisterNumber?: string;
  phone?: string;
  email?: string;
  type?: string;
  name?: string;
}

// user

export interface UserDto {
  _id: string;
  // username: string;
  lastname: string;
  email: string;
  firstname: string;
  password: string;
  avgRating: number;

  bInfo: ClientInfoDto;
  uInfo: UserInfoDto;
  verified: boolean;
  type: string;
}

export interface UserModel extends Document {
  // username: string;
  lastname: string;
  email: string;
  firstname: string;
  password: string;
  avgRating: number;

  bInfo: ClientInfoModel;
  uInfo: UserInfoModel;
  verified: boolean;
  type: string;
}
const UserInfoSchema: Schema = new mongoose.Schema(
  {
    registerNumber: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    name: {
      type: String,
    },
    profession: {
      type: String,
    },
  },
  { timestamps: true }
);
const ClientInfoSchema: Schema = new mongoose.Schema(
  {
    registerNumber: {
      type: String,
    },
    companyRegisterNumber: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    type: {
      enum: BusinessType,
      type: String,
    },
    name: {
      type: String,
    },
  },
  { timestamps: true }
);
const UserSchema: Schema = new mongoose.Schema(
  {
    // username: {
    //   type: String,
    //   required: true,
    // },
    // upwork
    lastname: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avgRating: {
      type: Number,
      required: true,
      default: 2,
    },

    bInfo: ClientInfoSchema,
    uInfo: UserInfoSchema,
    verified: {
      type: Boolean,
      default: false,
      required: true,
    },
    type: {
      type: String,
      enum: UserType,
    },
  },
  { timestamps: true }
);

const User =
  mongoose.models.User || mongoose.model<UserModel>("User", UserSchema);

export default User;
