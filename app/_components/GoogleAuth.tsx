"use client";
import { useStoreContext } from "@/context/store";
import { supabase } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import React from "react";

const GoogleAuth = () => {
  const { user, getUser, handleLogout } = useStoreContext();

  // NOTE:  Handle Google SignIn
  async function googleAuth() {
    await supabase.auth
      .signInWithOAuth({
        provider: "google",
        options: {
          redirectTo:
            "https://rlfmxthyvtdqwqgsktil.supabase.co/auth/v1/callback",
        },
      })
      .then(() => getUser())
      .catch((err) => console.log(err));
  }

  if (user) redirect("/task");
  return (
    <div>
      {!user ? (
        <button
          onClick={googleAuth}
          className="flex items-center gap-3 py-3 px-6 rounded-md bg-slate-300 text-lg text-black font-semibold hover:brightness-110 cursor-pointer"
        >
          <img src="./google.svg" alt="google" className="w-7 h-7" />
          Google Sign In
        </button>
      ) : (
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 py-3 px-6 rounded-md bg-teal-500 text-lg text-white font-semibold hover:brightness-110 cursor-pointer"
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default GoogleAuth;
