import type { NextPage, NextPageContext } from "next";
import cookie from "js-cookie";
import { useAuthUser } from "../src/context/UserContext";
import { useRouter } from "next/router";

const Home: NextPage = props => {
  const { user } = useAuthUser();
  const router = useRouter();
  console.log({ user });
  return (
    <div>
      yeahhhs
      <pre>{user?.name}</pre>
    </div>
  );
};

export default Home;
