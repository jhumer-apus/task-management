import { api } from "@/lib/axios";
import { queryClient } from "@/lib/queryClient";
import { CreateTask, Params, Task } from "@/types";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const initParams:Params = {
    search: "",
    status: ""
}

export const useTasks = (params:Params = initParams ) => {

    // Fetch tasks
    const {
        data,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["tasks", params],
        initialPageParam: 1,
        queryFn: async ({ pageParam = 1 }) => {
            const res = await api.get("/tasks", { params: { ...params, page: pageParam } });
            return res.data; 
        },
        getNextPageParam: (lastPage) => {
            return lastPage.current_page < lastPage.last_page
                ? lastPage.current_page + 1
                : undefined;
            },
    });

    const addTask = useMutation({
        mutationFn: async (newTask: CreateTask) => {
        const response = await api.post<Task>("/tasks", newTask);
            return response.data;
        },
        onSuccess: () => {
            toast.success("Task added successfully!");
            queryClient.invalidateQueries({ queryKey: ["tasks"] })
        },
        onError: () => {
            toast.error("Something Went Wrong")
        }
    });


    const editTask = useMutation({
        mutationFn: async (updatedTask: Task) => {
        const response = await api.put<Task>(`/tasks/${updatedTask.id}`, updatedTask);
            return response.data;
        },
        onSuccess: () => {
            toast.success("Task updated successfully!");
            queryClient.invalidateQueries({ queryKey: ["tasks"] })
        },
        onError: () => {
            toast.error("Something Went Wrong")
        }
    });

    const deleteTask = useMutation({
        mutationFn: async (id: number) => {
        const response = await api.delete<Task>(`/tasks/${id}`);
            return response.data;
        },
        onSuccess: () => {
            toast.success("Task deleted successfully!");
            queryClient.invalidateQueries({ queryKey: ["tasks"] })
        },
        onError: () => {
            toast.error("Something Went Wrong")
        }
    });

  return {
    data, 
    isLoading, 
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    addTask,
    editTask,
    deleteTask
  }
}