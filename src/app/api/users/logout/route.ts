import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({
      message: "Logout Successfully",
      success: true,
    });
    response.cookies.set("Token", "", { httpOnly: true, expires: Date.now() });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
