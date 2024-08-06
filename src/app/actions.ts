"use server"

import { cookies } from "next/headers"

export async function handleLogin(
  accessToken: string,
  refreshToken: string
): Promise<void> {
  cookies().set("accessToken", accessToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60,
    sameSite: "strict",
  })

  cookies().set("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60,
    sameSite: "strict",
  })
}
