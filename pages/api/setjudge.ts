import type { NextApiRequest, NextApiResponse } from "next";
import { Judge } from "../../src/data/entities/Judge";
import { User } from "../../src/data/entities/User";
import {
  getJudgeByDate,
  insertJudge,
  updateJudge,
} from "../../src/data/queries/judge";
import { getOrm } from "../../src/data/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Judge | null | string>
) {
  const { user, date, value }: { user: User; date: number; value: number } =
    JSON.parse(req.body);
  const orm = await getOrm();

  if (value === 1 || value < 0 || value > 5) {
    //@TODO make this a check on enum AND 1
    return res.status(412).send("No cheating, Boyd!");
  }

  //first check if there already is a value for this date and this user
  const current = await getJudgeByDate(orm, user.id, date);

  if (!current) {
    const result = await insertJudge(orm, user, date, value);
    return res.status(200).json(result.raw[0]);
  }
  const result = await updateJudge(orm, user, date, value);
  res.status(200).json(result.raw[0]);
}
