import {
  set_tokens_as_cookie,
  delete_tokens_from_cookies,
  authenticate,
} from "./tokenObject";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import apiClient from "@/apiServices/apiClient";
import { paths, apiPaths } from "@/components/authentication/urls";
import { setCookie, deleteCookie, getCookie } from "@/cookies/cookiesService";

interface User {
  username: string;
  email: string;
  contact: string;
}

interface UserLogin {
  username: string;
  password: string;
}

const userDataCookieName = "payload";

export async function authenticate_user(request: NextRequest) {
  if (!(await authenticate())) {
    return redirect_to_login(request);
  }
  if (request.nextUrl.pathname === paths.logoutRedirect) {
    return NextResponse.next();
  }
}

export function redirect_to_login(request: NextRequest) {
  const loginUrl = new URL(paths.logoutRedirect, request.url);
  loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export async function get_login_data_from_server(
  username: string,
  password: string
) {
  try {
    const response = await apiClient(apiPaths.login, "ProdBackendServer", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    return response;
  } catch (error: any) {
    console.error("Error logging in:", error);
    return false;
  }
}

export async function set_user_data_as_cookie(custom_data: User) {
  try {
    setCookie(userDataCookieName, JSON.stringify(custom_data), {
      maxAge: 60 * 60 * 24,
    });
  } catch (error: any) {
    console.error("payload set error:", error.message);
  }
}

export async function delete_user_data_as_cookie() {
  try {
    await deleteCookie(userDataCookieName);
  } catch (error: any) {
    console.error("payload delete error:", error.message);
  }
}

export async function get_user_data_as_cookie() {
  const userDataString = await getCookie(userDataCookieName);
  if (userDataString) {
    return JSON.parse(userDataString);
  } else {
    return { name: "unknown user", email: "system@gmail.com" };
  }
}

export async function login(values: UserLogin) {
  const response = await get_login_data_from_server(
    values.username,
    values.password
  );
  if (response) {
    try {
      await set_tokens_as_cookie({
        accessToken: response.access,
        refreshToken: response.refresh,
      });
      await set_user_data_as_cookie(response.custom_data);
    } catch (error: any) {
      console.error("Error saving tokens", error);
    }

    return { access: true, status: "success", message: "Login successful" };
  } else {
    return {
      access: false,
      status: "failed",
      message: "Username or Password Incorrect",
    };
  }
}

export async function logout(logoutRedirectPath?: string) {
  const defaultRedirectPath = paths.logoutRedirect || logoutRedirectPath;
  try {
    await delete_user_data_as_cookie();
    await delete_tokens_from_cookies();
    return defaultRedirectPath;
  } catch (error: any) {
    console.error("logout error : ", error);
    return false;
  }
}

export default {
  login,
  logout,
  redirect_to_login,
  authenticate_user,
};