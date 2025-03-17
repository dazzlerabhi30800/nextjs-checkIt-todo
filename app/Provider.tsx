"use client";
import React, { ReactNode, useEffect, useState } from "react";
import ContextProvider from "@/context/store";

const Provider = ({ children }: { children: ReactNode }) => {
  const [client, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  if (!client) return null;
  return (
    <div className="flex min-h-screen flex-col">
      <ContextProvider>{children}</ContextProvider>
    </div>
  );
};

export default Provider;
