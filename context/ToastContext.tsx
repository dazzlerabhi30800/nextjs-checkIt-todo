import { toast, toastState } from "@/type";
import React, { createContext, useContext, useReducer } from "react";
import { toastReducer } from "./ToastReducer";

type context = {
  toasts: Array<toast>;
  value: any;
};

export const toastContext = createContext<context>({
  toasts: [],
  value: {},
});

export default function ToastContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialState: toastState = {
    toasts: [],
  };
  const [state, dispatch] = useReducer(toastReducer, initialState);

  const addToast = (type: string, message: string) => {
    const randId = Math.floor(Math.random() * 10000);
    dispatch({ type: "add", payload: { id: randId, message, type } });
  };

  function success(message: string) {
    addToast("success", message);
  }
  function info(message: string) {
    addToast("info", message);
  }
  function warning(message: string) {
    addToast("warning", message);
  }
  function error(message: string) {
    addToast("error", message);
  }

  function remove(id: number) {
    dispatch({ type: "remove", payload: { id: id, message: "hello" } });
  }

  const value = { success, warning, error, info, remove };
  const { toasts } = state;

  return (
    <toastContext.Provider value={{ value, toasts }}>
      {children}
    </toastContext.Provider>
  );
}

export const useToast = () => {
  const todoContext = useContext(toastContext);
  if (!todoContext) {
    throw new Error("you have not wrapped the layout in provider wrapper");
  }
  return todoContext;
};
