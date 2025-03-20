"use client";
import { todoStore } from "@/context/StoreSlice";
import React, { ReactNode, useEffect, useState } from "react";

const Provider = ({ children }: { children: ReactNode }) => {
  const [client, setClient] = useState(false);
  const { getUser } = todoStore((state) => state);

  useEffect(() => {
    setClient(true);
  }, []);

  useEffect(() => {
    if (!client) return;
    getUser();
  }, [client]);

  if (!client) return null;
  return <div className="flex min-h-screen flex-col">{children}</div>;
};

export default Provider;
