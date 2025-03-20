import { todoStore } from "@/context/StoreSlice";
import { redirect } from "next/navigation";
import React, { ComponentType } from "react";

function AuthHOC<P extends object>(Component: ComponentType<P>) {
  const WrappedComp = (props: P) => {
    const { user } = todoStore((state) => state);
    if (user) {
      redirect("/task");
    }
    return <Component {...props} />;
  };
  return WrappedComp;
}

export default AuthHOC;
