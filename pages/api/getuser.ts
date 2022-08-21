// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../src/data/entities/User";
import { createConnection, getConnection } from "typeorm";
import { getOrm } from "../../src/data/utils";
import "reflect-metadata";
import { checkUserById, checkUserByName } from "../../src/data/queries/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | null>
) {
  const id = req.query.id as unknown as number;
  const orm = await getOrm();

  //check if username exists.
  const user = await checkUserById(orm, id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json(null);
  }
}
