"use client";
import React, { ReactNode, useEffect, useState } from "react";
import ContextProvider from "@/context/store";

const Provider = ({ children }: { children: ReactNode }) => {
  const [client, setClient] = useState(false);
  useEffect(() => {
    setClient(true);
  }, []);

  if (!client) return;
  return (
    <div>
      <ContextProvider>{children}</ContextProvider>
    </div>
  );
};

export default Provider;
