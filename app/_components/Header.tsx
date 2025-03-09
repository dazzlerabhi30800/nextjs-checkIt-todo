"use client";
import React, { useEffect, useRef, useState } from "react";
import { useStoreContext } from "@/context/store";
import ThemeSwitch from "./ThemeSwitch";

const Header = () => {
  const { user, handleLogout } = useStoreContext();
  const [showOption, setShowOptions] = useState(false);
  const ref = useRef<null | HTMLDivElement>(null);

  const checkClick = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", checkClick);
    return () => window.removeEventListener("click", checkClick);
  }, []);

  return (
    <header className="py-4 px-8 flex justify-between items-center">
      <img src="./logo.svg" alt="Check It" className="w-10 h-8" />
      {/* INFO  & Theme Switcher Comp */}
      <div className="flex justify-center items-center gap-6">
        {user && (
          <div ref={ref} className="relative">
            <button onClick={() => setShowOptions((prev) => !prev)}>
              <img
                className="w-10 h-10 border border-purple-200 object-cover rounded-[50%]"
                src={user?.picture}
                alt={user?.full_name}
              />
            </button>
            <div
              className={`flex absolute left-1/2 -translate-x-1/2 top-12 flex-col min-w-20 rounded-md border-2 border-slate-500 ${
                showOption ? "scale-100" : "scale-0"
              } transition duration-150 ease-in-out`}
            >
              <h2 className="border-b text-center border-slate-500 text-sm py-1 px-5">
                {user.name.split(" ")[0]}
              </h2>
              {/* Option */}
              <button
                onClick={handleLogout}
                className="w-full py-1 px-5 text-sm  bg-transparent hover:text-purple-400"
              >
                Logout
              </button>
            </div>
          </div>
        )}
        {/* Theme Switch Comp */}
        <ThemeSwitch />
      </div>
    </header>
  );
};

export default Header;
