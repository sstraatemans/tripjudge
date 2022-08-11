import type { NextPage, NextPageContext } from "next";
import cookie from "js-cookie";
import { useAuthUser } from "../src/hooks/useAuthUser";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { addDays, format } from "date-fns";
import { useJudge } from "../src/hooks/useJudge";

const Home: NextPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { user, signOut } = useAuthUser();
  const { judge } = useJudge(selectedDate, user);

  useEffect(() => {}, []);

  const handleChangeDate = (changeVal: number) => {
    setSelectedDate(v => addDays(v, changeVal));
  };

  return (
    <div>
      <pre>{user?.name}</pre>
      <Button onClick={signOut}>logout</Button>
      <h2>{format(selectedDate, "EEEE dd-MMMM-yyyy")}</h2>
      <pre>{JSON.stringify(judge, null, 2)}</pre>
      <Button onClick={() => handleChangeDate(-1)}>prev</Button>
      <Button onClick={() => handleChangeDate(+1)}>next</Button>
    </div>
  );
};

export default Home;
