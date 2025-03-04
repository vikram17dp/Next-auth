import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import { connect } from '@/dbconfig/dbconfig';
import User from '@/models/usermodel.js';
import jwt from 'jsonwebtoken'

export async function POST(request:NextRequest){
    try {
        await connect();
        const reqBody = await request.json();
        const {email,password} = reqBody;
        const user = await User.findOne({ email });
        if (!user) {
          return NextResponse.json({ error: "User doesnot exits" }, { status: 400 });
        }
        const validPassword = await bcryptjs.compare(password,user.password);
        if(!validPassword){
            return NextResponse.json({
                error:"wrong password!"
            },{status:400})
        }
        const tokenData = {
            id:user._id,
            email:email,
            password:validPassword
        }
        const token = await jwt.sign(tokenData,process.env.TOKEN_SCERET!,{expiresIn:'1d'})
        const response = NextResponse.json({
            message:"User Login Successfully!",
            sucess:true
        })
        response.cookies.set("token",token,{
            httpOnly:true
        })
        return response;
    } catch (error) {
        return NextResponse.json({
      error: error instanceof Error ? error.message : "Unknown error",
    }, { status: 500 });
  }
    
}