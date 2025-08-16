import { FaUserCircle } from "react-icons/fa";

export default function AuthorAvatar({ name }) {
    return (
        <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
            <FaUserCircle className="text-gray-500 dark:text-gray-300" />
            <span className="text-sm text-gray-700 dark:text-gray-200">{name}</span>
        </div>
    );
}
