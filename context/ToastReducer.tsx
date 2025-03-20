import { toastState } from "@/type";

type action = {
  type: string;
  payload: {
    id: number;
    message: string;
    type?: string;
  };
};

export const toastReducer = (state: toastState, action: action) => {
  switch (action.type) {
    case "add":
      return {
        ...state,
        toasts: [...state.toasts, action.payload],
      };
    case "remove":
      const newToast = state.toasts.filter(
        (item) => item.id !== action.payload.id
      );
      return {
        ...state,
        toasts: newToast,
      };
    default:
      throw new Error("Unhandled action type");
  }
};
