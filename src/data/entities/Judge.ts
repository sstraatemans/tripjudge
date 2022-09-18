import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

import { User } from "./User";

export enum ValueType {
  SAD = 1,
  OK = 2,
  GOOD = 3,
  AWESOME = 4,
  DRINKINGCOMA = 5,
}

@Entity()
export class Judge {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user: User) => user.judges)
  user: Partial<User>;

  @Column()
  date: number;

  @Column({
    type: "enum",
    enum: ValueType,
    default: null,
  })
  value: ValueType;
}
