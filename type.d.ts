import { UserMetadata } from "@supabase/supabase-js";

interface task {
  id: string;
  created_at: string;
  task: string;
  createdBy: string;
  completed: boolean;
}

type userType = UserMetadata | null | undefined;

interface toast {
  id: number;
  message: string;
  type?: string;
}

interface toastState {
  toasts: Array<toast>;
}
