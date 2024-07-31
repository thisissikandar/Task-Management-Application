import { getDataFromToken } from "@/helpers/getDataFromToken";
import { connectDB } from "@/lib/dbConnect";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  connectDB();
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password ");
    return NextResponse.json({ message: "user found", data: user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
