import { NextResponse } from "next/server";
const { default: dbConnect } = require("@/lib/mongodb");
const { default: User } = require("@/models/User");
 
// GET user by Id
export async function GET(Request,{ params } ) {
  await dbConnect();
  const user = await User.findById(params.id);
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  return NextResponse.json({ user });
}

// DELETE user by Id
export async function DELETE(Request,context) {
  await dbConnect();
   const id = context?.params?.id || Request.url.split("/").pop();
  const deletedUser = await User.findByIdAndDelete(id);
  return NextResponse.json({ message: "User deleted successfully" });
}

// export async function DELETE(req, context) {
//   await dbConnect();
//   const id = context?.params?.id || req.url.split("/").pop();
//   console.log("Deleting ID:", id);
//   const user = await User.findByIdAndDelete(id);
//   return Response.json({ message: "User deleted successfully" }, { status: 200 });
// }


// UPDATE user by Id
export async function PUT(Request, context) {
  const { name, email } = await Request.json();
  await dbConnect();
  const id = context?.params?.id || Request.url.split("/").pop();
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { name, email },
    { new: true }
  );
  if (!updatedUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  return NextResponse.json({ updatedUser });
}