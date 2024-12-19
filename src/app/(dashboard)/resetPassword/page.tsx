import { get_user_data_as_cookie } from "@/components/authentication/features/UserObject"
import ForgotPasswordLayout from "@/components/authentication/layouts/forgotPasswordLayouts/forgotPassword"

export default async function ResetPassword() {
  const { name } = await get_user_data_as_cookie()
  return (
    <div className="flex items-center justify-center flex-col h-full">
      <ForgotPasswordLayout name={name} />
    </div>
  )
}
