import { setCookie, deleteCookie, getCookie } from "@/cookies/cookiesService";
import { verifyJwtToken } from "../utils/verifyToken";

interface UserTokens {
  accessToken: string;
  refreshToken: string;
}

const accessTokenName = "accessToken";
const refreshTokenName = "refreshToken";

export async function authenticate() {
  if (await verify_access_token()) {
    return true;
  } else {
    if (await renew_access_token()) {
      return true;
    } else {
      return false;
    }
  }
}

async function verify_access_token() {
  try {
    const access = await get_access_token();
    if (access) {
      const payload = await verifyJwtToken(access);
      if (payload) {
        console.log("verfy token");
        console.log(payload);
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (error: any) {
    console.error("error in getting access token: ", error);
    return false;
  }
}

async function renew_access_token() {
  return false;
}

/**
 * Sets both access and refresh tokens as cookies.
 * @param values - An object containing accessToken and refreshToken.
 * @returns {boolean} - Returns true if the tokens are successfully set, otherwise false.
 */
export async function set_tokens_as_cookie(values: UserTokens) {
  try {
    const { accessToken, refreshToken } = values;
    await set_access_token(accessToken);
    await set_refresh_token(refreshToken);
  } catch (error: any) {
    console.error("Token set error:", error.message);
    return false;
  }
  return true;
}

/**
 * Deletes both access and refresh tokens from cookies.
 * @returns {boolean} - Returns true if the tokens are successfully deleted, otherwise false.
 */
export async function delete_tokens_from_cookies() {
  try {
    await delete_access_token();
    await delete_refresh_token();
  } catch (error: any) {
    console.error("error deleting tokens from cookie:", error.message);
    return false;
  }
  return true;
}

/**
 * Retrieves both access and refresh tokens from cookies.
 * @returns {Object} - An object containing functions to get access and refresh tokens.
 */
export async function get_tokens_from_cookies() {
  return {
    access: get_refresh_token,
    refresh: get_access_token,
  };
}

/**
 * Retrieves the refresh token from cookies.
 * @returns {Promise<string | null>} - Returns the refresh token or null if not found.
 */
export async function get_refresh_token() {
  return await getCookie(refreshTokenName);
}

/**
 * Retrieves the access token from cookies.
 * @returns {Promise<string | null>} - Returns the access token or null if not found.
 */
export async function get_access_token() {
  return await getCookie(accessTokenName);
}

/**
 * Deletes the access token from cookies.
 */
export async function delete_access_token() {
  try {
    await deleteCookie(accessTokenName);
  } catch (error: any) {
    console.error("accessToken delete error:", error.message);
  }
}

/**
 * Deletes the refresh token from cookies.
 */
export async function delete_refresh_token() {
  try {
    await deleteCookie(refreshTokenName);
  } catch (error: any) {
    console.error("refreshToken delete error:", error.message);
  }
}

/**
 * Sets the access token in cookies with a max age of 24 hours.
 * @param accessToken - The access token to be saved.
 */
export async function set_access_token(accessToken: string) {
  try {
    await setCookie(accessTokenName, accessToken, {
      maxAge: 60 * 60 * 24, // 24 hours
    });
  } catch (error: any) {
    console.error("accessToken set error:", error.message);
  }
}

/**
 * Sets the refresh token in cookies with a max age of 1 week.
 * @param refreshToken - The refresh token to be saved.
 */
export async function set_refresh_token(refreshToken: string) {
  try {
    await setCookie(refreshTokenName, refreshToken, {
      maxAge: 60 * 60 * 24 * 7, // 1 week, adjust as needed
    });
  } catch (error: any) {
    console.error("refreshToken set error:", error.message);
  }
}

export default {
  set_tokens_as_cookie,
  set_refresh_token,
  set_access_token,
  delete_tokens_from_cookies,
  authenticate,
};
