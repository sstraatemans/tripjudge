import { NextPage } from "next";
import { Button, FormControl, TextField } from "@mui/material";
import { FormEvent, useEffect, useRef } from "react";
import { useAuthUser } from "../src/context/UserContext";
import { useRouter } from "next/router";

const LoginPage: NextPage = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const { signIn, user } = useAuthUser();
  const router = useRouter();

  useEffect(() => {
    if (user?.uid) {
      router.push("/");
    }
  }, [user]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!formRef.current) return;
    const data = new FormData(formRef.current);
    signIn(data);
  };
  return (
    <div>
      <form ref={formRef} onSubmit={handleSubmit}>
        <TextField
          id="username"
          name="username"
          label="Username"
          variant="outlined"
        />
        <Button type="submit" variant="outlined">
          login
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
