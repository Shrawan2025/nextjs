// lib/mongodb.js
import User from "@/models/User";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

export default dbConnect;

async function dbConnect() {
  if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable");
  }
  await mongoose.connect(MONGODB_URI);
  return mongoose;
}

// delete user by id
export async function DELETE(Request, { params }) {
  await dbConnect();
  const deletedUser = await User.deleteOne({ _id: params.id });
  return Response.json({ deletedUser });
}

// Insert User
export async function POST(Request) {
  const { name, email } = await Request.json();
  await dbConnect();
  const newUsers = new User({ name, email });
  await newUsers.save();
  return Response.json({ newUsers });
}

// Update User by id
export async function PUT(Request, { params }) {
  const { name, email } = await Request.json();
  await dbConnect();
  const updatedUser = await User.findByIdAndUpdate(
    params.id,
    { name, email },
    { new: true },
  );
  return Response.json({ updatedUser });
}
