import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

export const getDataFromToken = async(request:NextRequest)=>{
    try {
        const token = request.cookies.get("Token")?.value || "";
        const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET_KEY!)
        return decodedToken.id

    } catch (error:any) {
       throw new Error(error.message)
    }
}