// pages/api/leads/create.ts

import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const lead = req.body

      res.status(201).json(lead)
    } catch (error) {
      res.status(500).json({ error: "Failed to create lead" })
    }
  } else {
    res.setHeader("Allow", ["POST"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
