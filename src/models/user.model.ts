import { FreelancerEducationType } from "@/components/profile/create/education";
import { FreelancerExperienceType } from "@/components/profile/create/experience";
import { UserType, SocialType, BusinessType, UserStatus } from "@/utils/enum";
import mongoose, { Document, Schema } from "mongoose";

// user info
export interface UserInfoDto {
  role: string[];
  experiences: FreelancerExperienceType[];
  educations: FreelancerEducationType[];
  languages: {
    language: string;
    level: string;
  }[];
}
export interface UserInfoModel extends Document {
  role: string[];
  experiences: FreelancerExperienceType[];
  educations: FreelancerEducationType[];
  languages: {
    language: string;
    level: string;
  }[];
}
export interface UserInfoModel extends Document {
  role: string[];
  experiences: FreelancerExperienceType[];
  educations: FreelancerEducationType[];
  languages: {
    language: string;
    level: string;
  }[];
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
  status: UserStatus;
  type: UserType;
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
  status: UserStatus;
  type: UserType;
}

// const ClientInfoSchema: Schema = new mongoose.Schema(
//   {
//     registerNumber: {
//       type: String,
//     },
//     companyRegisterNumber: {
//       type: String,
//     },
//     phone: {
//       type: String,
//     },
//     email: {
//       type: String,
//     },
//     type: {
//       enum: BusinessType,
//       type: String,
//     },
//     name: {
//       type: String,
//     },
//   },
//   { timestamps: true }
// );
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

    // bInfo: ClientInfoSchema,
    uInfo: {
      role: { type: [String], trim: true },
      experiences: {
        type: [
          {
            title: { type: String },
            company: { type: String },
            level: { type: String },
            companyDirect: { type: String },
            profession: { type: String },
            currentWorking: { type: Boolean },
            startDate: { type: Date },
            endDate: { type: Date },
            description: { type: String },
            startYear: { type: Number },
            startMonth: { type: String },
            endYear: { type: Number },
            endMonth: { type: String },
            salary: { type: Number },
          },
        ],
      },

      educations: {
        type: [
          {
            school: { type: String },
            degree: { type: String },
            region: { type: String },
            gpa: { type: String },
            study: { type: String },
            currentWorking: { type: Boolean },
            startDate: { type: Date },
            endDate: { type: Date },
            description: { type: String },
            startYear: { type: Number },
            startMonth: { type: String },
            endYear: { type: Number },
            endMonth: { type: String },
            salary: { type: Number },
          },
        ],
      },
      languages: {
        type: [
          {
            language: { type: String },
            level: { type: String },
          },
        ],
      },
    },
    status: {
      type: String,
      default: UserStatus.CREATED,
      enum: UserStatus,
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
