import { connectDB } from "@/lib/dbConnect";
import UserModel from "@/models/userModel";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
  connectDB();
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    // check if user exist
    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User Not exists with this email " },
        { status: 400 }
      );
    }

    // compare password with db password
    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
  
    if (!isPasswordCorrect) {
      return NextResponse.json(
        { error: "Enter Correct password" },
        { status: 400 }
      );
    }
    const payload = {
      id: user._id,
      username: user.fullName,
    };
    const token =  jwt.sign(payload, process.env.TOKEN_SECRET_KEY!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "User Loged In Successfully",
      success: true,
    });

    response.cookies.set("Token", token, { httpOnly: true });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
