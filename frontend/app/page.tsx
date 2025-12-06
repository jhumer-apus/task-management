"use client";

import AddTask from "@/components/AddTask";
import SearchBar from "@/components/SearchBar";
import StatusFilter from "@/components/StatusFilter";
import Tasks from "@/components/Tasks";
import { useTasks } from "@/hooks/useTasks";
import { Params } from "@/types";
import { useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";

export default function Home() {
  const [params, setParams] = useState<Params>({
    search: "",
    status: ""
  });

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useTasks(params);

  // Flatten pages into a single array
  const tasks = data?.pages.flatMap(page => page.data) ?? [];

  const renderTasks = () => {
    return tasks.length > 0 
      ? (<Tasks tasks={tasks} />) 
      : (
          <div className="text-4xl mt-8 text-center">
            Empty Tasks
          </div>
        )
  }

  const handleSearch = (search: string) => {
    setParams(curr => ({
      ...curr,
      search
    }));
  }

  const handleSelectTag = (status: "completed" | "pending" | "") => {
    setParams(curr => ({
      ...curr,
      status
    }));
  }

  return (
    <div className="p-8">
      <main className="w-full md:w-[800px] mx-auto mt-10">
        <h1 className="text-3xl text-center font-bold mb-20">Your To Do</h1>

        <SearchBar onSearch={handleSearch} />
        <StatusFilter statusActive={params.status} onSelected={handleSelectTag} />

        <button 
          className="bg-slate-700 text-white px-4 py-1 mt-8 cursor-pointer active:bg-slate-900"
          onClick={() => setParams({ status: "", search: "" })}
        >
          Reset Filter
        </button>

        <div className="border-t-2 border-slate-300 mt-2">
          <FaCirclePlus 
            onClick={() => setIsOpen(true)}
            className="cursor-pointer text-5xl mt-10 mx-auto text-slate-700 hover:text-slate-800"
          />

          {isLoading ? (
            <div className="text-4xl mt-8 text-center">Loading...</div>
          ) : renderTasks()}

          {/* Load more button */}
          {hasNextPage && (
            <div className="text-center mt-4">
              <button
                className="px-4 py-2 bg-slate-700 text-white rounded"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
              >
                {isFetchingNextPage ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </div>
      </main>

      <AddTask isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
