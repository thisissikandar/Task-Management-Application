import mongoose, { Document, Schema } from "mongoose";
import crypto from 'crypto'

export const USER_TEMPORARY_TOKEN_EXPIRY = 20 * 60 * 1000; 
export interface User extends Document {
  avatar?: {
    url: string;
    localPath: string;
  };
  fullName: string;
  email: string;
  password: string;
  isVerified: boolean;
  isAdmin: boolean;
  forgotPasswordToken?: string;
  forgotPasswordTokenExpiry?: Date | null;
  verifyToken?: string;
  verifyTokenExpiry?: Date | null;
}

const userSchema: Schema<User> = new Schema(
  {
    avatar: {
      type: {
        url: String,
        localPath: String,
      },
      default: {
        url: `https://via.placeholder.com/200x200.png`,
        localPath: "",
      },
    },
    fullName: {
      type: String,
      require: [true, "Please provide Full Name"],
      unique: true,
    },
    email: {
      type: String,
      require: [true, "Please Provide Email"],
      unique: true,
    },
    password: {
      type: String,
      require: [true, "Please Provide Password"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
  },
  { timestamps: true }
);

userSchema.methods.generateTemporaryToken = function () {
  // This token should be client facing
  // for example: for email verification unHashedToken should go into the user's mail
  const unHashedToken = crypto.randomBytes(20).toString("hex");

  // This should stay in the DB to compare at the time of verification
  const hashedToken = crypto
    .createHash("sha256")
    .update(unHashedToken)
    .digest("hex");
  // This is the expiry time for the token (20 minutes)
  const tokenExpiry = Date.now() + USER_TEMPORARY_TOKEN_EXPIRY;

  return { unHashedToken, hashedToken, tokenExpiry };
};

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", userSchema);
export default UserModel;
