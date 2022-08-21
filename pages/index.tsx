import type { NextPage, NextPageContext } from "next";
import cookie from "js-cookie";
import { useAuthUser } from "../src/hooks/useAuthUser";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { Button, Stack } from "@mui/material";
import { addDays, format, isBefore, isAfter, isEqual } from "date-fns";
import { useJudge } from "../src/hooks/useJudge";
import { constants } from "../src/data/constants";

const Home: NextPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { user, signOut } = useAuthUser();
  const { judge, setJudgeData } = useJudge(selectedDate, user);

  const showPrev = useMemo(() => {
    const startDate = new Date(constants.STARTDATE);
    if (isBefore(selectedDate, startDate)) {
      setSelectedDate(startDate);
    }

    if (isEqual(startDate, selectedDate)) return false;

    return true;
  }, [selectedDate]);

  const showNext = useMemo(() => {
    const endDate = new Date(constants.ENDDATE);
    if (isAfter(selectedDate, endDate)) {
      setSelectedDate(endDate);
    }

    if (isEqual(endDate, selectedDate)) return false;

    return true;
  }, [selectedDate]);

  useEffect(() => {}, []);

  const handleChangeDate = (changeVal: number) => () => {
    setSelectedDate(v => addDays(v, changeVal));
  };

  const handleClick = (value: number) => () => {
    setJudgeData(value, selectedDate);
  };

  return (
    <div>
      <pre>{user?.name}</pre>
      <Button onClick={signOut}>logout</Button>
      <h2>{format(selectedDate, "EEEE dd-MMMM-yyyy")}</h2>

      <Stack direction="row">
        <Button onClick={handleClick(1)}>Sad</Button>
        <Button onClick={handleClick(2)}>OK</Button>
        <Button onClick={handleClick(3)}>Good</Button>
        <Button onClick={handleClick(4)}>Awesome</Button>
        <Button onClick={handleClick(5)}>DRINKING COMA</Button>
      </Stack>

      <pre>{JSON.stringify(judge, null, 2)}</pre>

      {showPrev && <Button onClick={handleChangeDate(-1)}>prev</Button>}
      {showNext && <Button onClick={handleChangeDate(+1)}>next</Button>}
    </div>
  );
};

export default Home;
