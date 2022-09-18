import { DataSource, InsertResult, UpdateResult } from "typeorm";
import { Judge } from "../entities/Judge";
import { User } from "../entities/User";

export const getJudgeByDate = async (
  orm: DataSource,
  uid: number,
  date: number
) =>
  orm
    .getRepository(Judge)
    .createQueryBuilder("judge")
    .leftJoinAndSelect("judge.user", "user")
    .where("user.id = :uid", { uid })
    .andWhere("judge.date = :date", { date })
    .getOne();

export const insertJudge = (
  orm: DataSource,
  user: User,
  date: number,
  value: number
): Promise<InsertResult> =>
  orm
    .createQueryBuilder()
    .insert()
    .into(Judge)
    .values({
      user: { id: user.id },
      date,
      value,
    })
    .execute();

export const updateJudge = (
  orm: DataSource,
  user: User,
  date: number,
  value: number
): Promise<UpdateResult> =>
  orm
    .getRepository(Judge)
    .createQueryBuilder()
    .update({ value })
    .where("user.id = :uid", { uid: user.id })
    .andWhere("judge.date = :date", { date })
    .returning("*")
    .execute();
