import { FaUserLock } from "react-icons/fa";
export default function Settings() {
    return (
        <div className="space-y-6 flex flex-col items-center justify-center min-h-[80vh] text-center z-1">
            < h2 className="text-3xl font-bold mb-2" > Settings</h2 >
            <FaUserLock className="text-violet-600 dark:text-violet-400 text-[120px]" />
            <p className="text-gray-700 dark:text-gray-300 max-w-md">Nothing to configure yet.</p>
        </div >
    );
}
