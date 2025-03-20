"use client";
import React, { useEffect, useRef, useState } from "react";
import ThemeSwitch from "./ThemeSwitch";
import Image from "next/image";
import { todoStore } from "@/context/StoreSlice";
import { useToast } from "@/context/ToastContext";

const Header = () => {
  const { user, handleLogout, theme } = todoStore((state) => state);
  const [showOption, setShowOptions] = useState(false);
  const ref = useRef<null | HTMLDivElement>(null);
  const { value: toast } = useToast();

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
    <header className="py-4 px-4  md:px-8 flex justify-between items-center">
      <Image
        src={theme === "dark" ? "./logo-header.svg" : "./logo-light.svg"}
        width={32}
        height={32}
        priority={true}
        className="w-8 h-8 drop-shadow-sm"
        alt="Check It"
      />
      {/* INFO  & Theme Switcher Comp */}
      <div className="flex justify-center items-center gap-3 md:gap-6">
        {user && (
          <div ref={ref} className="relative">
            <button onClick={() => setShowOptions((prev) => !prev)}>
              {user.picture ? (
                <Image
                  className="w-10 h-10 border border-purple-200 object-cover rounded-[50%]"
                  width={40}
                  height={40}
                  src={user?.picture}
                  alt={user?.full_name}
                />
              ) : (
                <img
                  src="https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_640.png"
                  className="w-10 h-10 border border-purple-200 object-cover rounded-[50%]"
                  alt={user?.email}
                />
              )}
            </button>
            <div
              className={`flex absolute left-1/2 -translate-x-1/2 top-12 flex-col min-w-20 rounded-md border-2 border-slate-500 ${
                showOption ? "scale-100" : "scale-0"
              } transition duration-150 ease-in-out`}
            >
              <h2 className="border-b text-center border-slate-500 text-sm py-1 px-5">
                {user.name ? user.name.split(" ")[0] : user.email}
              </h2>
              {/* Option */}
              <button
                onClick={() => {
                  handleLogout();
                  setShowOptions(false);
                  toast.success("successfully logged out");
                }}
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
