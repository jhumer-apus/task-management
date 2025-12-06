import { Task, TaskWithRemoving } from "@/types"
import clsx from "clsx";
import { FaCheck, FaPenToSquare, FaTrash, FaXmark } from "react-icons/fa6";
import { Dispatch, Fragment, SetStateAction } from "react";
import dayjs from "dayjs";
import { UseMutationResult } from "@tanstack/react-query";

interface Props {
    task:TaskWithRemoving;
    setSelectedTask: Dispatch<SetStateAction<Task>>;
    setIsEdit: Dispatch<SetStateAction<boolean>>;
    handleUpdateTask: (task:Task) => void; 
    handleDeleteTask: (id:number) => void; 

}
export default function TaskCard({ task, setIsEdit, setSelectedTask, handleUpdateTask, handleDeleteTask }: Props) {
    
    return (
        <div
            key={task.id}
            className={clsx(
                "card",
                task.removing ? "-translate-y-4 opacity-0" : "translate-y-0 opacity-100"
            )}
        >

            <div className="flex gap-4 justify-end">
                {!task.completed && (
                    <FaPenToSquare 
                        onClick={() => {
                            setSelectedTask(() => task)
                            setIsEdit(() => true)
                        }}
                        className="text-xl cursor-pointer text-slate-600"
                    />
                )}
                <FaXmark 
                    className="text-xl cursor-pointer text-slate-600" 
                    onClick={() => handleDeleteTask(task.id)}
                />
            </div>
       
            <div className="text-slate-700 flex flex-col gap-2 w-full max-w-[500px] h-fit col-span-7 mt-8">
                <h1 className="text-2xl font-semibold">{task.title}</h1>
                <p className="">{task.description}</p>
                <p className="font-semibold">Deadline: {dayjs(task.deadline).format("MMM DD, YYYY")}</p>
                <div className="mt-10">
                    {task.completed 
                        ?  (
                                <div className="text-green-700 flex gap-2 items-center text-lg">
                                    Completed <FaCheck className="col-span-1" />
                                </div>
                        )
                        :   (
                                <button 
                                    className="flex gap-2 items-center w-fit py-2 px-4 text-white cursor-pointer bg-green-600 hover:bg-green-700 active:bg-green-800"
                                    onClick={() => handleUpdateTask({ ...task, completed: true })}
                                >
                                    Complete Task <FaCheck className="text-xl"/>
                                </button>
                            )
                    }
                </div>
            </div>
        </div>
    )
}