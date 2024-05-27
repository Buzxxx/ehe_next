// pages/api/reset-password.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  const { oldPassword, newPassword } = req.body;

  // Implement your password reset logic here
  // For example, validate the old password, hash the new password, update the database, etc.

  // Simulate a successful response
  res.status(200).json({ message: "Password reset successful" });
}
