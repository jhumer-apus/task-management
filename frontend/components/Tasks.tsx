import { useState, useEffect } from "react";
import { useTasks } from "@/hooks/useTasks";
import { Task, TaskWithRemoving } from "@/types"
import EditTask from "./EditTask";
import TaskCard from "./TaskCard";
import Loading from "./Loading";
import SearchBar from "./SearchBar";

interface Props {
    tasks: Task[]
}

export default function Tasks({ tasks }: Props) {
    const { deleteTask, editTask, isLoading } = useTasks()
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [selectedTask, setSelectedTask] = useState<Task>({
        id: NaN,
        title: "",
        description: "",
        deadline: "",
        completed: false
    })
    const [taskList, setTaskList] = useState<TaskWithRemoving[]>(tasks);


    // Keep local state in sync with prop tasks
    useEffect(() => {
        setTaskList(tasks);
    }, [tasks]);

    const handleDelete = async (id:number) => {

        try {
            await deleteTask.mutateAsync(id);

            // remove task from list
            setTaskList(curr => curr.filter(task => task.id !== id));
            
        } catch (err) {
            console.error("Delete failed:", err);
        }
    }

    const handleUpdate = async (newTask: Task) => {
        try {
            const updatedTask = await editTask.mutateAsync({...newTask});

            setTaskList(curr => 
                curr.map(t => 
                    t.id === newTask.id ? updatedTask : t  
                )
            );
            setIsEdit(() => false)
        } catch (error) {
            console.error(error);
            setIsEdit(() => false)
        }
    };


    return (
        <div className="flex flex-col gap-8 mt-8 py-8">
            {taskList.map((task,index) => (
                <TaskCard 
                    key={index}
                    task={task} 
                    setSelectedTask={setSelectedTask} 
                    setIsEdit={setIsEdit} 
                    handleUpdateTask={handleUpdate}
                    handleDeleteTask={handleDelete}
                />
            ))}
            <EditTask 
                isOpen={isEdit}
                setIsOpen={setIsEdit}
                task={selectedTask} 
                handleUpdate={handleUpdate}
                isSubmitting={editTask.isPending}            
            />
            {(editTask.isPending || deleteTask.isPending || isLoading) && <Loading />}
        </div>
    );
}
