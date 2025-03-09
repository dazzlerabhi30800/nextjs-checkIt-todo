import { userType } from "@/type";
import { supabase } from "@/utils/supabase/client";
import { UserMetadata } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import React, {
  createContext,
  SetStateAction,
  ReactNode,
  useState,
  useContext,
  useEffect,
} from "react";

interface context {
  user: userType;
  setUser: React.Dispatch<SetStateAction<userType | null>>;
  getUser(): Promise<void>;
  handleLogout: () => Promise<void>;
}

const context = createContext<context>({
  user: null,
  setUser: (user) => user,
  async getUser() {},
  async handleLogout() {},
});

export default function ContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<userType>(
    JSON.parse(window.localStorage.getItem("user") || "null")
  );

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      setUser(data.session.user.user_metadata);
      window.localStorage.setItem("user", JSON.stringify(user));
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    redirect("/");
  };

  return (
    <context.Provider value={{ user, setUser, getUser, handleLogout }}>
      {children}
    </context.Provider>
  );
}

export const useStoreContext = () => {
  const storeContext = useContext(context);
  if (!context) {
    throw new Error("context is not wrapped");
  }
  return storeContext;
};
