"use server"; // This ensures that the functions are treated as server-side

import { cookies } from "next/headers";

interface CookieOptions {
  path?: string;
  domain?: string;
  maxAge?: number;
  expires?: Date;
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
}

export const getCookie = (name: string): string | null => {
  const cookieStore = cookies();
  return cookieStore.get(name)?.value || null;
};

export const setCookie = (
  name: string,
  value: string,
  options: CookieOptions = {}
): void => {
  const cookieStore = cookies();
  cookieStore.set(name, value, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    ...options,
  });
};

export const deleteCookie = (name: string): void => {
  const cookieStore = cookies();
  cookieStore.set(name, "", {
    path: "/",
    expires: new Date(0),
  });
};

export const updateCookie = (
  name: string,
  value: string,
  options: CookieOptions = {}
): void => {
  setCookie(name, value, options);
};
