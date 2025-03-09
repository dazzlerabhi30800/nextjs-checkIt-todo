import { useStoreContext } from "@/context/store";
import { MoonIcon, SunIcon } from "lucide-react";
import React from "react";

const ThemeSwitch = () => {
  const { theme, setTheme } = useStoreContext();
  return (
    <div>
      {/* Sun Icon */}
      <button
        onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
        className={`text-lg ${
          theme === "dark" ? "text-purple-200" : "text-black"
        }`}
      >
        {theme === "dark" ? <SunIcon /> : <MoonIcon />}
      </button>
    </div>
  );
};

export default ThemeSwitch;
