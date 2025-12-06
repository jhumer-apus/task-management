import { OrbitProgress } from "react-loading-indicators";

export default function Loading() {
    return (
        <div className="fixed inset-0 h-screen w-screen flex items-center justify-center z-100 bg-gray-400/50">
            <OrbitProgress color="black" size="medium" text="" textColor="" />
        </div>
    )
}