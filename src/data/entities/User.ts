import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Judge } from "./Judge";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Judge, (judge: Judge) => judge.user)
  judges: Partial<Judge[]>;
}
