import { Dayjs } from "dayjs";

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  deadline: Date | string | Dayjs
}


export type CreateTask = Omit<Task, "id", "completed">;

export interface TaskWithRemoving extends Task {
  removing?: boolean;
}

export interface Params {
  search: string;
  status: "completed" | "pending" | "";
}
