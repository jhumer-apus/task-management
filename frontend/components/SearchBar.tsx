import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

interface Props {
    onSearch: (search:string) => void
}

export default function SearchBar({ onSearch }: Props) {
    const [query, setQuery] = useState<string>("");

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") onSearch(query);
    };
    return(
        <div className="flex gap-4 my-16">
            <input 
                placeholder="Search Tasks" 
                className="w-full px-4 focus:outline-none focus:ring-0 border-b border-slate-800"
                onKeyDown={handleKeyDown}
                onChange={(e) => setQuery(() => e.target.value)}
            />
            <FaMagnifyingGlass 
                onClick={() => onSearch(query)}
                className="cursor-pointer text-2xl text-slate-500 hover:text-slate-800 active:text-slate-900"
            />

            {/* <button 
                className="bg-gray-700 text-white px-4 py-2 w-fit cursor-pointer cursor-pointer active:bg-gray-900"
                onClick={() => onSearch(query)}
            >
                Search
            </button> */}
        </div>
    )
}