import { get_user_data_as_cookie } from "@/components/authentication/features/UserObject";

export async function fetch_User_Data() {
  try {
    const userData = await get_user_data_as_cookie();
    return userData.name;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return "Unknown User";
  }
}

export default {
  fetch_User_Data,
};
