// validation.ts
import * as Yup from "yup";

export const TaskSchema = Yup.object().shape({
  title: Yup.string().required("Title is required").min(3, "Min 3 characters"),
  deadline: Yup.string().required("Deadline is required"),
  description: Yup.string()
    .required("Description is required")
    .min(5, "Min 5 characters"),
});
