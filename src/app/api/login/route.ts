// /app/api/login/route.ts

import { handleLogin } from "@/app/actions"
import { loginUser } from "@/lib/loginUser"
import { NextResponse } from "next/server"

// Handle the login request
export async function POST(request: Request) {
  const data = await request.json()

  try {
    const response = await loginUser(data)
    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}

// export const accessTest = async (
//   token: string
// ): Promise<AccessTestResponse> => {
//   try {
//     const response = await fetch(
//       "https://www.eheindustries.com/auth/api/accesstest",
//       {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     )

//     if (!response.ok) {
//       throw new Error("Network response was not ok")
//     }

//     const result = await response.json()
//     return result
//   } catch (error) {
//     console.error("Error accessing test:", error)
//     throw error
//   }
// }

// export const refreshToken = async (
//   data: RefreshTokenData
// ): Promise<TokenResponse> => {
//   try {
//     const response = await fetch(
//       "https://www.eheindustries.com/auth/api/token/refresh",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       }
//     )

//     if (!response.ok) {
//       throw new Error("Network response was not ok")
//     }

//     const result = await response.json()
//     return result
//   } catch (error) {
//     console.error("Error refreshing token:", error)
//     throw error
//   }
// }
