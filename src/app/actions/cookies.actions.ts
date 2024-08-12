// app/actions/cookies.actions

"use server"

import { cookies } from "next/headers"
export async function saveLoginTokenInCookie(
  cookieName: string,
  cookieValue: string
): Promise<void> {
  cookies().set(cookieName, cookieValue, {
    httpOnly: true,
    maxAge: 24 * 60 * 60,
    sameSite: "strict",
  })
}

export async function deleteCookie(name: string) {
  const cookieStore = cookies()
  cookieStore.delete(name)
}
