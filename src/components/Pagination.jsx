import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-center mt-6 gap-2">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-sm disabled:opacity-50 flex items-center gap-1"
            >
                <FaChevronLeft /> Prev
            </button>

            {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                    key={idx}
                    onClick={() => onPageChange(idx + 1)}
                    className={`px-3 py-1 rounded text-sm ${currentPage === idx + 1
                            ? "bg-violet-600 text-white"
                            : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                        }`}
                >
                    {idx + 1}
                </button>
            ))}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-sm disabled:opacity-50 flex items-center gap-1"
            >
                Next <FaChevronRight />
            </button>
        </div>
    );
}
