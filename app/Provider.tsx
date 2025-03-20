"use client";
import { todoStore } from "@/context/StoreSlice";
import React, { ReactNode, useEffect, useState } from "react";
import ToastContainer from "./_components/toast/ToastContainer";
import ToastContextProvider, { useToast } from "@/context/ToastContext";

const Provider = ({ children }: { children: ReactNode }) => {
  const [client, setClient] = useState(false);
  const { getUser } = todoStore((state) => state);
  const { toasts } = useToast();

  useEffect(() => {
    setClient(true);
  }, []);

  useEffect(() => {
    if (!client) return;
    getUser();
  }, [client]);

  if (!client) return null;
  return (
    <div className="flex min-h-screen flex-col">
      <ToastContextProvider>
        <ToastContainer />
        {children}
      </ToastContextProvider>
    </div>
  );
};

export default Provider;
