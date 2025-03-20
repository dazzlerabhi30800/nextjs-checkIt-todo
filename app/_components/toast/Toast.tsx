"use client";
import { useToast } from "@/context/ToastContext";
import React from "react";

interface toast {
  id: number;
  type?: string;
  message: string;
}

type ToastKey = "success" | "error" | "warning" | "info";

type ToastTypes = Record<
  ToastKey,
  {
    colorClass: string;
  }
>;

const toastTypes: ToastTypes = {
  success: {
    colorClass: "border-green-400",
  },
  error: {
    colorClass: "border-red-400",
  },
  warning: {
    colorClass: "border-orange-400",
  },
  info: {
    colorClass: "border-yellow-400",
  },
};

const Toast = ({ id, type, message }: toast) => {
  const { value: toast } = useToast();
  const { colorClass } = toastTypes[type as ToastKey];
  return (
    <div
      onAnimationEnd={() => toast.remove(id, message)}
      className={`flex w-[250px] border-2 bg-transparent justify-center text-center p-3 rounded-lg shadow-md ${colorClass} toast--notification`}
    >
      <p>{message}</p>
    </div>
  );
};

export default Toast;
