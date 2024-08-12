"use server"

import { saveLoginTokenInCookie } from "@/app/actions/cookies.actions"

interface LoginData {
  username: string
  password: string
}

interface TokenResponse {
  access: string
  refresh: string
}

export const loginUser = async (data: LoginData): Promise<TokenResponse> => {
  try {
    const response = await fetch(
      "https://www.eheindustries.com/auth/api/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )

    if (!response.ok) {
      throw new Error("Network response was not ok")
    }

    const result: TokenResponse = await response.json()
    saveLoginTokenInCookie("accessToken", result.access)
    saveLoginTokenInCookie("refreshToken", result.refresh)
    return result
  } catch (error) {
    console.error("Error logging in:", error)
    throw new Error(`Error logging in: ${(error as Error).message}`)
  }
}

export const verifyAccessTokenWithServer = async (
  token: string
): Promise<boolean> => {
  try {
    const response = await fetch(
      "https://www.eheindustries.com/auth/api/accesstest",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    return response.ok
  } catch (error) {
    console.error("Error verifying access token:", error)
    return false
  }
}

export const refreshToken = async (
  refreshTokenString: string
): Promise<TokenResponse | null> => {
  try {
    const response = await fetch(
      "https://www.eheindustries.com/auth/api/token/refresh",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: refreshTokenString }),
      }
    )

    if (!response.ok) {
      throw new Error("Failed to refresh token")
    }

    const result = await response.json()
    return result
  } catch (error) {
    console.error("Error refreshing token:", error)
    return null
  }
}
