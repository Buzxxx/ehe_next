import { jwtVerify } from "jose";

// Your secret key
const secretKey = new TextEncoder().encode(
  "!4v&dhm!qi4ljs_)91+dkwouqy_1er9%21_=e3zi*x6%crk(bg"
);

export async function verifyJwtToken(token: string) {
  try {
    // Verify the JWT token
    const { payload } = await jwtVerify(token, secretKey);
    return payload;
  } catch (err) {
    console.error("JWT verification failed:", err);
    return null;
  }
}
