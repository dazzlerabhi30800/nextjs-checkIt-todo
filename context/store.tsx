import { userType } from "@/type";
import { supabase } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import React, {
  createContext,
  SetStateAction,
  ReactNode,
  useState,
  useContext,
  useEffect,
  useLayoutEffect,
} from "react";

interface context {
  user: userType;
  setUser: React.Dispatch<SetStateAction<userType | null>>;
  getUser(): Promise<void>;
  handleLogout: () => Promise<void>;
  theme: string;
  setTheme: React.Dispatch<SetStateAction<string>>;
  tasks: Array<any>;
  setTasks: React.Dispatch<SetStateAction<Array<any>>>;
}

const context = createContext<context>({
  user: null,
  setUser: (user) => user,
  async getUser() {},
  async handleLogout() {},
  theme: "dark",
  setTheme: (theme) => theme,
  tasks: [],
  setTasks: (tasks) => tasks,
});

export default function ContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<userType>(
    JSON.parse(window.localStorage.getItem("user") || "null"),
  );
  const [tasks, setTasks] = useState<Array<any>>([]);
  const [theme, setTheme] = useState<string>(
    window.localStorage.getItem("theme") || "dark",
  );

  useLayoutEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("dark", "light");
    root.classList.add(theme);
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    if (user) return;
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      setUser(data.session.user.user_metadata);
    }
  }

  useEffect(() => {
    window.localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    redirect("/");
  };

  return (
    <context.Provider
      value={{
        user,
        setUser,
        getUser,
        handleLogout,
        theme,
        setTheme,
        tasks,
        setTasks,
      }}
    >
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
