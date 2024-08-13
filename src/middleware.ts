// middleware.ts

import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import {
  verifyAccessTokenWithServer,
  refreshToken,
} from "@/app/actions/auth.actions"

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value

  function redirectToLogin(request: NextRequest) {
    const loginUrl = new URL("/accounts/login", request.url)
    loginUrl.searchParams.set("redirect", request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (accessToken) {
    const accessTokenCheck = await verifyAccessTokenWithServer(accessToken)

    if (!accessTokenCheck) {
      const refreshTokenString = request.cookies.get("refreshToken")?.value

      if (refreshTokenString) {
        const newToken = await refreshToken(refreshTokenString)

        // If the refresh token is successful, update the access token cookie
        if (newToken) {
          const response = NextResponse.next()
          response.cookies.set("accessToken", newToken.access, { path: "/" })
          return response
        } else {
          return redirectToLogin(request)
        }
      } else {
        return redirectToLogin(request)
      }
    }
  } else {
    return redirectToLogin(request)
  }

  return NextResponse.next()
}

// Specify the paths where the middleware should run
export const config = {
  matcher: ["/dashboard/:path*", "/lead", "/workplace"],
}
