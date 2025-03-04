import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import { connect } from '@/dbconfig/dbconfig';
import User from '@/models/usermodel.js';

export async function POST(request:NextRequest) {
  try {
    await connect();
    const reqBody = await request.json();
    const { name, email, password } = reqBody;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already registered" }, { status: 400 });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    console.log("User created:", newUser);

    return NextResponse.json({ message: "User created successfully" }, { status: 201 });

  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : "Unknown error",
    }, { status: 500 });
  }
}
