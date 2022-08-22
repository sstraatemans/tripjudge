import type { NextPage } from "next";
import { useAuthUser } from "../src/hooks/useAuthUser";
import { useMemo, useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { addDays, format, isBefore, isAfter, isEqual } from "date-fns";
import { useJudge } from "../src/hooks/useJudge";
import { constants } from "../src/data/constants";
import Vote from "../src/components/Vote";

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

  const handleChangeDate = (changeVal: number) => () => {
    setSelectedDate(v => addDays(v, changeVal));
  };

  const handleClick = (value: number) => {
    setJudgeData(value, selectedDate);
  };

  if (!user) return <div>loading</div>;

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-evenly"
        alignContent="center"
      >
        <Typography variant="body1">{user?.name}</Typography>
        <Button onClick={signOut}>logout</Button>
      </Stack>
      <Typography variant="h4">
        {format(selectedDate, "EEEE dd-MMMM-yyyy")}
      </Typography>

      <Stack direction="row" justifyContent="space-evenly">
        <Vote judge={judge} setJudgeData={handleClick} />
      </Stack>

      {showPrev && <Button onClick={handleChangeDate(-1)}>prev</Button>}
      {showNext && <Button onClick={handleChangeDate(+1)}>next</Button>}
    </>
  );
};

export default Home;
