// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getTime } from "date-fns";
import type { NextApiRequest, NextApiResponse } from "next";
import { Judge } from "../../src/data/entities/Judge";
import { getOrm } from "../../src/data/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Judge | null>
) {
  const body = JSON.parse(req.body);
  const orm = await getOrm();

  console.log(333, { body });

  //first check if there already is a value for this date and this user
  const current = await orm
    .getRepository(Judge)
    .createQueryBuilder("judge")
    .where("judge.date=:date", { date: body.date })
    .andWhere("judge.userId=:userId", { userId: body.user.id })
    .getOne();

  console.log(2222, current);
  // //if so, update
  // // if not, insert
  let result;
  if (!current) {
    // result = await orm
    //   .createQueryBuilder()
    //   .insert()
    //   .into(Judge)
    //   .values(body)
    //   .execute();
    // console.log(result);
  } else {
  }

  res.status(200).json(null);
}
