import { useEffect, useState } from "react";
import { User } from "../data/entities/User";

export enum ValueType {
  SAD,
  OK,
  GOOD,
  AWESOME,
  DRINKINGCOMA,
}

export type JudgeType = {
  id?: string;
  date: Date;
  uid: number;
  value: ValueType;
};

const useJudge = (date: Date, user: User | null) => {
  const [judge, setJudge] = useState<JudgeType>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    getDateData(date, user?.id);
  }, [date, user]);

  useEffect(() => {
    setIsLoading(false);
  }, [judge]);

  const getDateData = async (date: Date, uid?: number) => {
    if ((!user || !date) && isLoading) return;
    setIsLoading(true);
    const result = await fetch(`/api/getjudge?uid=${uid}&date=${date}`);
    const data = await result.json();

    setJudge(data);
  };

  return { judge, isLoading };
};

export { useJudge };
