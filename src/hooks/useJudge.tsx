import { getTime } from "date-fns";
import { useEffect, useState } from "react";
import { Judge } from "../data/entities/Judge";
import { User } from "../data/entities/User";

const useJudge = (date: Date, user: User | null) => {
  const [judge, setJudge] = useState<Judge>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    if (user?.id) {
      getJudgeData(date, user.id);
    }
  }, [date, user]);

  useEffect(() => {
    setIsLoading(false);
  }, [judge]);

  const getJudgeData = async (date: Date, uid: number) => {
    if ((!uid || !date) && isLoading) return;
    setIsLoading(true);
    const result = await fetch(
      `/api/getjudge?uid=${uid}&date=${getTime(date) / 1000}`
    );

    const data = await result.json();

    setJudge(data);
  };

  const setJudgeData = async (value: number, date: Date) => {
    const result = await fetch("/api/setjudge", {
      method: "POST",
      body: JSON.stringify({ value, user, date: getTime(date) / 1000 }),
    });

    if (result.status === 200) {
      const data = await result.json();

      setJudge(data);
    }
  };

  return { judge, isLoading, setJudgeData };
};

export { useJudge };
