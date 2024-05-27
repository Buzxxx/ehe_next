// src/app/api/accounts/verifyToken/route.ts
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

import { SECRET_KEY } from "@/lib/constant";

export async function GET(req) {
  const token = req.headers.get("authorization")?.split(" ")[1];

  if (!token) {
    return NextResponse.json({ message: "No token provided" }, { status: 401 });
  }

  try {
    jwt.verify(token, SECRET_KEY);
    return NextResponse.json({ message: "Token is valid" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}
