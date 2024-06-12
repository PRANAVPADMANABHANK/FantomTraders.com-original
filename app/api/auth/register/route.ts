import { connectToDatabase } from "@/helpers/server-helpers";
import prisma from "@/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req: Request) => {
  try {
    console.log("reached")
    const { name, email, mobile, password } = await req.json();
    console.log(name, "name?")
    console.log(email, "email?")
    console.log(mobile, "mobile?")
    console.log(password, "password?")

    if (!name || !email || !mobile || !password)
      return NextResponse.json({ message: "Invalid Data" }, { status: 422 });
    const hashedPassword = await bcrypt.hash(password, 10);

    await connectToDatabase();
    const user = await prisma.user.create({
      data: { email, name, mobile, hashedPassword },
    });

    console.log(user, "user ?")
    return NextResponse.json({ user }, { status: 201 });
    
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server Error" }, { status: 201 });
  } finally {
    await prisma.$disconnect();
  }
};
