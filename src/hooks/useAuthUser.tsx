import { createContext, useContext, FC, useEffect, useState } from "react";
import cookies from "js-cookie";
import { User, EmptyUser } from "../data/entities/User";
import { useRouter } from "next/router";

type Props = {
  children: React.ReactElement;
};

type UserContextProps = {
  user: User | EmptyUser; //@TODO: take 1 value of the user object;
  signIn: (formData: FormData) => Promise<void>;
  signOut: () => Promise<void>;
};

const userContext = createContext<UserContextProps>({
  user: {},
  signIn: async (formData: FormData) => {},
  signOut: async () => {},
});

// custom hook to use the authUserContext and access authUser and loading
export const useAuthUser = () => useContext(userContext);

export const UserProvider: FC<Props> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [user, setUser] = useState<User | EmptyUser>({});
  const router = useRouter();

  useEffect(() => {
    if (!user?.id) {
      router.push("/login");
      cookies.remove("uid");
    } else {
      router.push("/");
    }
  }, [user, hasError]);

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
      if (!user?.id) {
        setHasError(true);
      } else {
        setHasError(false);
      }
    }
  }, [user]);

  const signIn = async (formData: FormData): Promise<void> => {
    const result = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ username: formData.get("username") }),
    });

    const data = await result.json();

    console.log(data);

    setUser(data);
    cookies.set("uid", data.id, { expires: 12 });
  };

  const getUser = async (uid: string) => {
    if (isLoading) return;
    setIsLoading(true);
    setHasError(false);
    const result = await fetch(`/api/getuser?id=${uid}`);

    console.log(result);

    //@TODO: do checks
    if (result.status === 200) {
      const data = await result.json();
      if (data) {
        setUser(data);
      }
    } else {
      setUser({});
    }
  };

  const signOut = async (): Promise<void> => {
    cookies.remove("uid");
    setUser({});
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
