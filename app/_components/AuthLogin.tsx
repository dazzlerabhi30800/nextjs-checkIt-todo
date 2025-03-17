"use client";
import { useStoreContext } from "@/context/store";
import { supabase } from "@/utils/supabase/client";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { FormEvent, useState } from "react";

const AuthLogin = ({ children }: { children: React.ReactNode }) => {
  const { theme, user } = useStoreContext();

  const [emailVal, setEmailVal] = useState("");
  const [passVal, setPassVal] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailVal.match(emailRegex)) {
      alert("email is not valid");
      return;
    }
    if (passVal.length < 4) {
      alert("password must be greater than 4");
      return;
    }
    // if(email.match)
    const { data, error } = await supabase.auth.signInWithPassword({
      email: emailVal,
      password: passVal,
    });
    if (error) {
      console.log(error);
    }
    if (data && !error) {
      console.log(data);
      // redirect("/task");
    }
  };

  if (user) redirect("/task");
  return (
    <div className="flex flex-col gap-10 auth--form p-6 rounded-md w-full max-w-xl">
      <form className="flex flex-col gap-5" onSubmit={handleLogin}>
        <div>
          <label htmlFor="email" className="hidden"></label>
          <input
            type="text"
            placeholder="Email"
            value={emailVal}
            onChange={(e) => setEmailVal(e.target.value)}
            id="email"
            className="py-3 px-6 border rounded-md focus:outline-none"
          />
        </div>
        <div className="relative">
          <label htmlFor="password" className="hidden"></label>
          <input
            placeholder="Password"
            type={showPass ? "text" : "password"}
            value={passVal}
            onChange={(e) => setPassVal(e.target.value)}
            id="password"
            className="py-3 px-6 border rounded-md focus:outline-none"
          />
          <button
            onClick={() => setShowPass((prev) => !prev)}
            className="absolute top-1/2 -translate-1/2 right-2 hover:opacity-50"
          >
            {showPass ? <EyeClosedIcon size={20} /> : <EyeIcon size={20} />}
          </button>
        </div>
        <button className="py-3 px-6 shadow-md flex justify-center w-full auth--btn rounded-md hover:brightness-125 text-lg font-medium">
          Login
        </button>
      </form>
      {children}
      <Link
        href={"/signIn"}
        className={`text-lg font-bold text-center underline ${
          theme === "dark"
            ? "text-white hover:text-gray-400"
            : "text-black  hover:text-slate-600"
        }`}
      >
        Not Registered? Sign In
      </Link>
    </div>
  );
};

export default AuthLogin;
