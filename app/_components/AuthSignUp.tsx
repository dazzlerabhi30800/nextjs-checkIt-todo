"use client";
import { supabase } from "@/utils/supabase/client";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { FormEvent, useState } from "react";
import AuthHOC from "./AuthHOC";
import { todoStore } from "@/context/StoreSlice";
import { useToast } from "@/context/ToastContext";

const AuthSignUp = () => {
  const { theme, setUser } = todoStore((state) => state);
  const { value: toast } = useToast();

  const [showPass, setShowPass] = useState(false);
  const [name, setName] = useState("");
  const [emailVal, setEmailVal] = useState("");
  const [passVal, setPassVal] = useState("");

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailVal.match(emailRegex)) {
      toast.error("email is not valid");
      return;
    }
    if (!name.length) {
      toast.error("please provide valid username");
      return;
    }
    if (passVal.length < 4) {
      toast.error("password must be greater than 4");
      return;
    }
    // if(email.match)
    const { data, error } = await supabase.auth.signUp({
      email: emailVal,
      password: passVal,
      options: {
        data: {
          display_name: name,
        },
      },
    });
    if (error) {
      toast.error(error.message);
    }
    if (data && !error) {
      setUser(data?.user?.user_metadata);
      toast.info(`welcome back ${data?.user?.user_metadata.display_name}`);
      redirect("/task");
    }
  };

  return (
    <div className="flex flex-col gap-10 auth--form p-6 rounded-md w-[90%] max-w-xl shadow-sm">
      <h1 className="font-bold mb-2 ml-3 font-(family-name:--font-inter) text-xl md:text-3xl">
        Register
      </h1>{" "}
      <form className="flex flex-col gap-5" onSubmit={handleLogin}>
        <div>
          <label htmlFor="username" className="hidden"></label>
          <input
            type="text"
            name="username"
            value={name}
            placeholder="username"
            id="username"
            onChange={(e) => setName(e.target.value)}
            className="py-3 px-6 border rounded-md focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="email" className="hidden"></label>
          <input
            type="text"
            name="email"
            value={emailVal}
            placeholder="Email - abhi02@gmail.com"
            id="email"
            onChange={(e) => setEmailVal(e.target.value)}
            className="py-3 px-6 border rounded-md focus:outline-none"
          />
        </div>
        <div className="relative">
          <label htmlFor="password" className="hidden"></label>
          <input
            placeholder="Password"
            name="password"
            value={passVal}
            onChange={(e) => setPassVal(e.target.value)}
            type={showPass ? "text" : "password"}
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
        <button
          type="submit"
          className="py-3 px-6 shadow-md flex justify-center w-full auth--btn rounded-md hover:brightness-125 text-lg font-medium"
        >
          Register
        </button>
      </form>
      <Link
        href={"/"}
        className={`text-lg font-bold text-center underline ${
          theme === "dark"
            ? "text-white hover:text-gray-400"
            : "text-black  hover:text-slate-600"
        }`}
      >
        Already Registered? Login
      </Link>
    </div>
  );
};

export default AuthHOC(AuthSignUp);
