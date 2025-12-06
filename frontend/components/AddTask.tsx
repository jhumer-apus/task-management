import { useTasks } from "@/hooks/useTasks";
import { TaskSchema } from "@/schema/task";
import { CreateTask } from "@/types";
import clsx from "clsx";
import { ErrorMessage, Field, Form, Formik, useFormikContext } from "formik";
import { Dispatch, SetStateAction, useState } from "react";
import ReactModal from "react-modal";

interface Props {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: "white",
  },
  overlay: {
      backgroundColor: 'rgba(51, 65, 85, 0.6)', // slate-700 at 50% opacity
      zIndex: 999,
    },
};
export default function AddTask({ isOpen, setIsOpen }: Props) {

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { addTask } = useTasks();

  const onSubmit = async (values:CreateTask, { resetForm }: any) => {
    setIsSubmitting(true);

    try {
      await addTask.mutateAsync(values);  
      resetForm();                        
      setIsOpen(false);                   
    } catch (err) {
      console.error(err);
    }
    setIsSubmitting(false);
  }

  if (!isOpen) return null;

  return (
    <ReactModal
        isOpen={isOpen}
        onAfterOpen={() => setIsOpen(() => true)}
        onRequestClose={() => setIsOpen(() => false)}
        style={customStyles}
        contentLabel="Add Task"
        ariaHideApp={false}
      >
        <Formik
          initialValues={{ title: "", description: "", deadline: "" }}
          onSubmit={onSubmit}
          validationSchema={TaskSchema}
        >
        {({ values }) => (
          <Form className="flex flex-col gap-4 h-fit w-full md:w-[500px]">
            <h1 className="text-center text-3xl font-semibold">Add Task</h1>

            <div>
              <Field
                name="title"
                placeholder="Enter Title"
                className="border border-slate-300 p-2 w-full"
              />
              <ErrorMessage name="title" component="p" className="text-red-500" />
            </div>

            <div>
              <Field
                as="textarea"
                name="description"
                placeholder="Enter Description"
                className="border border-slate-300 p-2 w-full"
                maxLength={300}
                rows={10}
              />
              <p className="text-sm text-gray-500">
                {values.description.length}/300 characters
              </p>
              <ErrorMessage name="description" component="p" className="text-red-500" />
            </div>

            <div>
              <Field
                type="date"
                name="deadline"
                className="border border-slate-300 p-2 w-full"
              />
              <ErrorMessage name="deadline" component="p" className="text-red-500" />
            </div>

            <button 
              type="submit" 
              className="button-primary text-white p-2 rounded"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding..." : "Add Task"}
            </button>
          </Form>
        )}
        </Formik>
      </ReactModal>
  );
}
