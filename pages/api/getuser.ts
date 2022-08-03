// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../src/context/UserContext";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<User>
) {
  console.log(req.body);
  res.status(200).json({ uid: "111111111", name: "John Doe" });
}
