// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../src/data/entities/User";
import { checkUserById, checkUserByName } from "../../src/data/queries/user";
import { getOrm } from "../../src/data/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | null>
) {
  const orm = await getOrm();
  const { username } = JSON.parse(req.body);

  const user = await checkUserByName(orm, username);

  if (user) {
    res.status(200).json(user);
  } else {
    const result = await orm
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({
        name: username,
      })
      .execute();

    const [{ id }] = result.identifiers;

    const user = await checkUserById(orm, id);

    res.status(200).json(user);
  }
}
