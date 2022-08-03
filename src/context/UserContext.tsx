import { createContext, useContext, FC, useEffect, useState } from "react";
import cookies from "js-cookie";

export type User = {
  uid: string;
  name: string;
};

type Props = {
  children: React.ReactElement;
};

type UserContextProps = {
  isLoggedIn: boolean;
  user: User | null;
  signIn: (formData: FormData) => Promise<void>;
  signOut: () => Promise<void>;
};

const userContext = createContext<UserContextProps>({
  isLoggedIn: false,
  user: null,
  signIn: async (formData: FormData) => {},
  signOut: async () => {},
});

// custom hook to use the authUserContext and access authUser and loading
export const useAuthUser = () => useContext(userContext);

export const UserProvider: FC<Props> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!user) {
      const uid = cookies.get("uid");
      if (uid) {
        getUser(uid);
      }
    }
  }, []);

  const signIn = async (formData: FormData): Promise<void> => {
    const result = await fetch("/api/login", {
      method: "POST",
      body: formData,
    });

    const data = await result.json();

    setUser(data);
    // @TODO: add all kinds of checks
    cookies.set("uid", data.uid);
  };

  const getUser = async (uid: string) => {
    const result = await fetch(`/api/getuser?uid${uid}`);

    //@TODO: do checks
    const data = await result.json();
    setUser(data);
  };

  const signOut = async (): Promise<void> => {};

  return (
    <userContext.Provider
      value={{
        signIn,
        signOut,
        isLoggedIn,
        user,
      }}
    >
      {children}
    </userContext.Provider>
  );
};
