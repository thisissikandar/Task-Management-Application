import { sendEmail } from "@/helpers/nodemailer";
import { connectDB } from "@/lib/dbConnect";
import UserModel from "@/models/userModel";

import bcryptjs from "bcryptjs";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  connectDB();
  try {
    const { email, password, fullName } = await request.json();

    const user = await UserModel.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
    // console.log(user);
    //    hash password
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);
    // console.log(hashPassword);
    const newUser = new UserModel({
      fullName,
      email,
      password: hashPassword,
    });
    const saveUser = await newUser.save();
    console.log("saveUser", saveUser);

    await sendEmail({ email, emailType: "VERIFY", userId: saveUser._id });

    return NextResponse.json({
      message: "User Created successfully",
      success: true,
      data: saveUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
