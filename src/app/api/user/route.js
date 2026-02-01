import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

// GET all users
export async function GET() {
  try {
    await dbConnect();
    const users = await User.find({});
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to fetch users" }, { status: 500 });
  }
}

// POST create new user
export async function POST(request) {
  try {
    const { name, email } = await request.json();
    await dbConnect();

    const newUser = new User({ name, email });
    await newUser.save();

    return NextResponse.json({ newUser }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to create user" }, { status: 500 });
  }
}
