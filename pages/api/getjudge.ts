// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Judge } from "../../src/data/entities/Judge";
import { getOrm } from "../../src/data/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Judge | null>
) {
  const orm = await getOrm();

  const uid = req.query.uid as unknown as number;
  const date = req.query.date as unknown as number;

  const judgeResult = await getJudgeByDate(orm, uid, date);

  res.status(200).json(judgeResult);
}
