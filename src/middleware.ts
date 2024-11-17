import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { authenticate_user } from "@/components/authentication/features/UserObject";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  return await authenticate_user(request, response);
}

// Specify the paths where the middleware should run
export const config = {
  matcher: ["/dashboard/:path*", "/lead/:path*", "/workforce/:path*"],
};
