import { FaTimes } from "react-icons/fa";

export default function Modal({ title, children, onClose }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="relative bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg w-[90%] max-w-2xl max-h-[80%] overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                    <FaTimes size={18} />
                </button>
                {title && (
                    <h3 className="text-lg font-semibold text-violet-600 mb-3 pr-6">
                        {title}
                    </h3>
                )}
                <div className="text-sm text-gray-700 dark:text-gray-300">
                    {children}
                </div>
            </div>
        </div>
    );
}
