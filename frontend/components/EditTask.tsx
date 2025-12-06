import { TaskSchema } from "@/schema/task";
import { Task } from "@/types";
import clsx from "clsx";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Dispatch, SetStateAction } from "react";
import ReactModal from "react-modal";

interface Props {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  task: Task
  handleUpdate: (task:Task) => void
  isSubmitting: boolean
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
export default function EditTask({ isOpen, setIsOpen, task, handleUpdate, isSubmitting }: Props) {

  const onSubmit = (values:Task) => {
    handleUpdate(values)
  }

  if (!isOpen) return null;

  return (
    <ReactModal
        isOpen={isOpen}
        onAfterOpen={() => setIsOpen(() => true)}
        onRequestClose={() => setIsOpen(() => false)}
        style={customStyles}
        contentLabel="EditTask"
        ariaHideApp={false}
      >
        <Formik
          initialValues={task}
          onSubmit={onSubmit}
          validationSchema={TaskSchema}
        >
        {({ values }) => (
          <Form className="flex flex-col gap-4 h-fit w-full md:w-[500px]">
            <h1 className="text-center text-3xl font-semibold">Edit Task</h1>

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
              className={clsx("button-primary text-white p-2 rounded", isSubmitting ? "!bg-gray-200 !hover:bg-none !cursor-not-allowed" : "")}
              disabled= {isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Update"}
            </button>
          </Form>
        )}
        </Formik>
      </ReactModal>
  );
}
