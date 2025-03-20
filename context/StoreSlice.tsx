import { userType } from "@/type";
import { create } from "zustand";
import { supabase } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { createJSONStorage, persist } from "zustand/middleware";

interface slice {
  user: userType;
  getUser: () => Promise<void>;
  tasks: Array<any>;
  theme: string;
  handleLogout: () => Promise<void>;
  setTheme: (theme: string) => void;
  setTasks: (tasks: Array<any>) => void;
  setUser: (userInfo: userType) => void;
}

export const todoStore = create<slice>()(
  persist(
    (set, get) => ({
      user: null,
      tasks: [],
      theme: "dark",
      getUser: async () => {
        if (get().user) return;
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          set({ user: data.session.user.user_metadata });
        }
      },
      setUser: (userInfo) => {
        set({ user: userInfo });
      },
      handleLogout: async () => {
        await supabase.auth.signOut();
        set({ user: null, tasks: [] });
        redirect("/");
      },
      setTheme: (theme) => {
        set({ theme });
        const root = window.document.documentElement;
        root.classList.remove("dark", "light");
        root.classList.add(theme);
      },
      setTasks: (newTasks) => {
        set({ tasks: newTasks });
      },
    }),
    {
      name: "checkIt",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        tasks: state.tasks,
        theme: state.theme,
      }),
    }
  )
);
