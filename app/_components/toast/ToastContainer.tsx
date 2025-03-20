"use client";
import { toast } from "@/type";
import React from "react";
import Toast from "./Toast";
import { useToast } from "@/context/ToastContext";

const ToastContainer = () => {
  const { toasts } = useToast();
  return (
    <div className="flex flex-col gap-5 fixed bottom-40 z-40 right-5 toast--container">
      {toasts.map((toast: toast, index: number) => (
        <Toast {...toast} key={index} />
      ))}
    </div>
  );
};

export default ToastContainer;
