// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../src/data/entities/User";
import { createConnection, getConnection } from "typeorm";
import { getOrm } from "../../src/data/utils";
import "reflect-metadata";
import { checkUserByName } from "../../src/data/queries/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | null>
) {
  console.log(req.query);

  const orm = await getOrm();
  // console.log({ orm });

  //check if username exists.

  // if so return user

  // if not, create and return user

  await orm
    .createQueryBuilder()
    .insert()
    .into(User)
    .values({
      name: "steven",
    })
    .execute();

  const user = await orm
    .getRepository(User)
    .createQueryBuilder("user")
    .getOne();

  res.status(200).json(user);
}
