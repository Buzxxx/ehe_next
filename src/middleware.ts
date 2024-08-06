// middleware.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value

  if (!accessToken) {
    // Redirect to login page if no access token
    const loginUrl = new URL("/accounts/login", request.url)
    loginUrl.searchParams.set("redirect", request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Allow request to proceed if access token exists
  return NextResponse.next()
}

// Specify the paths where the middleware should run
export const config = {
  matcher: ["/dashboard/:path*", "/lead", "/workplace"],
}
