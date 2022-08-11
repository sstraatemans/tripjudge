import { createContext, useContext, FC, useEffect, useState } from "react";
import cookies from "js-cookie";
import { User } from "../data/entities/User";
import { useRouter } from "next/router";

type Props = {
  children: React.ReactElement;
};

type UserContextProps = {
  user: User | null;
  signIn: (formData: FormData) => Promise<void>;
  signOut: () => Promise<void>;
};

const userContext = createContext<UserContextProps>({
  user: null,
  signIn: async (formData: FormData) => {},
  signOut: async () => {},
});

// custom hook to use the authUserContext and access authUser and loading
export const useAuthUser = () => useContext(userContext);

export const UserProvider: FC<Props> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      router.push("/");
    }
  }, [user]);

  useEffect(() => {
    if (!user && !isLoading) {
      const uid = cookies.get("uid");
      if (uid) {
        getUser(uid);
      }
    }
  }, [isLoading]);

  useEffect(() => {
    if (user) {
      setIsLoading(false);
    }
  }, [user]);

  const signIn = async (formData: FormData): Promise<void> => {
    // if (isLoading) return;
    // setIsLoading(true);
    const result = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ username: formData.get("username") }),
    });

    const data = await result.json();

    setUser(data);
    // @TODO: add all kinds of checks
    cookies.set("uid", data.id);
  };

  const getUser = async (uid: string) => {
    if (isLoading) return;
    setIsLoading(true);
    console.log("getuser");
    const result = await fetch(`/api/getuser?id=${uid}`);

    //@TODO: do checks
    const data = await result.json();
    setUser(data);
  };

  const signOut = async (): Promise<void> => {
    cookies.remove("uid");
    setUser(null);
  };

  return (
    <userContext.Provider
      value={{
        signIn,
        signOut,
        user,
      }}
    >
      {children}
    </userContext.Provider>
  );
};
