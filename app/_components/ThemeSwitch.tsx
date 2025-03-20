import { todoStore } from "@/context/StoreSlice";
import { MoonIcon, SunIcon } from "lucide-react";
import React, { useLayoutEffect } from "react";

const ThemeSwitch = () => {
  const { theme, setTheme } = todoStore((state) => state);
  useLayoutEffect(() => {
    setTheme(theme);
  }, []);
  return (
    <div>
      {/* Sun Icon */}
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className={`text-lg ${
          theme === "dark" ? "text-purple-200" : "text-black"
        }`}
      >
        {theme === "dark" ? <SunIcon size={30} /> : <MoonIcon size={30} />}
      </button>
    </div>
  );
};

export default ThemeSwitch;
