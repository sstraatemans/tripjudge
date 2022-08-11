// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { JudgeType } from "../../src/hooks/useJudge";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<JudgeType>
) {
  console.log(req.query);
  res.status(200).json({
    uid: "111111111",
    value: Math.floor(Math.random() * 4),
    date: new Date(),
  });
}
