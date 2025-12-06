import clsx from "clsx"

type Status = "" | "completed" | "pending"
interface Props {
    statusActive: Status
    onSelected: (status: Status) => void
}

interface TagStatus {
    status: Status,
    label: string,
    backgroundColor: string
}
export default function StatusFilter({statusActive, onSelected}:Props) {
    const tagStatus: TagStatus[] = [
        {
            status: "",
            label: "All",
            backgroundColor: "bg-slate-500 hover:bg-slate-600 active:hover:bg-slate-600"
        },
        {
            status: "completed",
            label: "Completed",
            backgroundColor: "bg-green-500 hover:bg-green-600 active:hover:bg-green-600"
        },
        {
            status: "pending",
            label: "Pending",
            backgroundColor: "bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-600"
        },

    ]
    return (
        <div className="mt-8">
            <p className="font-bold">Filter Status:</p>
            <div>
                {tagStatus.map((tag,index) => (
                    <div 
                        key={index} 
                        onClick={() => onSelected(tag.status)}
                        className={clsx(
                            tag.backgroundColor, 
                            "mt-2 shadow-2xl w-28 text-center cursor-pointer text-white px-4 py-1 rounded-2xl inline-block ml-2",
                            statusActive == tag.status ? "border-4 border-blue-400" : ""
                        )}
                        
                    >
                        {tag.label}
                    </div>
                ))}
            </div>
        </div>
    )
}