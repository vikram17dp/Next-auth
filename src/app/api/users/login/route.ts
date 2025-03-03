import { NextRequest,NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import { connect } from '@/dbconfig/dbconfig';
import User from '@/models/usermodel.js'
connect();

export async function POST(request:NextRequest){
    try {
       const reqBody =  await request.json();
       const {name,email,password} = reqBody;
    
        
       const user = await User.findOne({email});

       if(user){
        return NextResponse.json({error:"User already registerd"},
            {status:400}
        )
       }

       const salt = await bcryptjs.genSalt(10)
       const hasedpassword = await bcryptjs.hash(password,salt);

       const newUser = await User({
            name,
            email,
            password:hasedpassword
       }).save();

       console.log(newUser)

       return NextResponse.json({
        message:"user created succesfully"
       },{status:201});

    } catch (error:any) {
        return NextResponse.json({
            error:error.message
        },
        {status:500}
    )
    }
}