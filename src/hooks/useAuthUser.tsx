import { createContext, useContext, FC, useEffect, useState } from "react";
import cookies from "js-cookie";
import { User } from "../data/entities/User";
import { useRouter } from "next/router";

type Props = {
  children: React.ReactElement;
};

type UserContextProps = {
  user: User | null; //@TODO: take 1 value of the user object;
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
  const [init, setInit] = useState(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const uid = cookies.get("uid");
    if ((uid && !user && !init) || !uid) {
      router.push("/login");
      cookies.remove("uid");
    } else {
      router.push("/");
    }
  }, [user, init]);

  useEffect(() => {
    const uid = cookies.get("uid");
    if (uid) {
      getUser(uid);
    } else {
      setInit(false);
    }
  }, []);

  const signIn = async (formData: FormData): Promise<void> => {
    const result = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ username: formData.get("username") }),
    });

    const data = await result.json();

    setUser(data);
    cookies.set("uid", data.id, { expires: 12 });
  };

  const getUser = async (uid: string) => {
    if (isLoading) return;
    setIsLoading(true);
    const result = await fetch(`/api/getuser?id=${uid}`);

    if (result.status === 200) {
      const data = await result.json();
      if (data) {
        setUser(data);
      }
    } else {
      setUser(null);
    }

    setInit(false);
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
