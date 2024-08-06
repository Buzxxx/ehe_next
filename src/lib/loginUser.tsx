import { handleLogin } from "@/app/actions"

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

    handleLogin(result.access, result.refresh)
    return result
  } catch (error) {
    console.error("Error logging in:", error)
    throw new Error(`Error logging in: ${(error as Error).message}`)
  }
}
