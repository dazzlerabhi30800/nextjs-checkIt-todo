"use client";
import { todoStore } from "@/context/StoreSlice";
import { InfoIcon } from "lucide-react";
import React, { useState } from "react";

const InfoComp = () => {
  const { theme } = todoStore((state) => state);
  const [showTip, setShowTip] = useState(false);
  const handleTip = () => {
    if (showTip) return;
    setShowTip(true);
    setTimeout(() => {
      setShowTip(false);
    }, 4000);
  };

  return (
    <footer className="fixed bottom-10 right-5 flex items-center flex-col gap-5">
      {/* Info Tip */}
      {showTip && (
        <div className="flex flex-col gap-5">
          <div className="info--container backdrop-blur-md py-3 px-4 rounded-md shadow-md">
            <p
              className={`${
                theme === "dark" ? "text-slate-100" : "text-stone-700"
              } text-sm font-bold`}
            >
              Ctrl + / - input focus
            </p>
          </div>
          <div className="info--container backdrop-blur-md py-3 px-4 rounded-md shadow-md">
            <p
              className={`${
                theme === "dark" ? "text-slate-100" : "text-stone-700"
              } text-sm font-bold`}
            >
              Esc - Input Blur
            </p>
          </div>
        </div>
      )}
      {/* Info Comp */}
      <button
        onClick={handleTip}
        className={`${
          theme === "dark" ? "text-slate-300 " : "text-stone-700"
        } text-sm md:text-base hover:opacity-50 self-end`}
      >
        <InfoIcon size={30} />
      </button>
    </footer>
  );
};

export default InfoComp;
