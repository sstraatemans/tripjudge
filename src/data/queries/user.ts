import { DataSource } from "typeorm";
import { User } from "../entities/User";

export const checkUserByName = async (
  orm: DataSource,
  name?: string
): Promise<User | null> => {
  if (!name) return null;
  const result = await orm
    .getRepository(User)
    .createQueryBuilder("user")
    .where("user.name = :name", { name: name.toLowerCase() })
    .getOne();

  return result;
};

export const checkUserById = async (
  orm: DataSource,
  id?: number
): Promise<User | null> => {
  if (!id) return null;
  const result = await orm
    .getRepository(User)
    .createQueryBuilder("user")
    .where("user.id = :id", { id })
    .getOne();

  return result;
};
