// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getTime } from "date-fns";
import type { NextApiRequest, NextApiResponse } from "next";
import { EntityManager } from "typeorm";
import { Judge } from "../../src/data/entities/Judge";
import { User } from "../../src/data/entities/User";
import { getJudgeByDate } from "../../src/data/queries/judge";
import { getOrm } from "../../src/data/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Judge | null>
) {
  const { user, date, value }: { user: User; date: number; value: number } =
    JSON.parse(req.body);
  const orm = await getOrm();

  //first check if there already is a value for this date and this user
  const current = await getJudgeByDate(orm, user.id, date);
  console.log({ current });
  if (!current) {
    const result = await orm
      .createQueryBuilder()
      .insert()
      .into(Judge)
      .values({
        user: { id: user.id },
        date,
        value,
      })
      .execute();

    res.status(200).json(result.raw);
  } else {
    const result = await orm
      .getRepository(Judge)
      .createQueryBuilder()
      .update({ value })
      .where("user.id = :uid", { uid: user.id })
      .andWhere("judge.date = :date", { date })
      .returning("*")
      .execute();

    console.log(11111, result);

    res.status(200).json(result.raw);
  }
}
