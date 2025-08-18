import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaFilter, FaEye } from "react-icons/fa";
import { FaBookReader } from "react-icons/fa";
import FilterModal from "../components/FilterModal";
import useFilters from "../hooks/useFilters";
import data from "../data/dummyData.json";

const actionButtons = [
    {
        label: "Set Filters",
        icon: <FaFilter />,
        onClick: (setOpen) => setOpen(true),
        style: "bg-violet-600 text-white hover:bg-violet-700"
    },
    {
        label: "View Articles",
        icon: <FaEye />,
        onClick: (_, navigate) => navigate("/articles"),
        style: "bg-gray-200 dark:bg-gray-700"
    }
];

export default function Dashboard() {
    const navigate = useNavigate();
    const { filters, updateFilters } = useFilters();
    const [open, setOpen] = useState(false);

    const availableTags = [...new Set(data.flatMap(a => a.tags))];
    const availableCategories = [...new Set(data.flatMap(a => a.category))];

    const apply = (f) => {
        updateFilters(f);
    };

    return (
        <div className="space-y-6 flex flex-col items-center justify-center min-h-[80vh] text-center">
            <div>
                <h2 className="text-3xl font-bold mb-2">Dashboard</h2>
                <p className="text-gray-700 dark:text-gray-300 max-w-md">
                    Welcome! Set your preferred filters below — we’ll use them across the app.
                </p>
            </div>

            <div className="flex justify-center items-center">
                <FaBookReader className="text-violet-600 dark:text-violet-400 text-[120px]" />
            </div>

            <div className="flex items-center justify-center">
                <div className="flex gap-3">
                    {actionButtons.map((btn) => (
                        <ActionButton
                            key={btn.label}
                            label={btn.label}
                            icon={btn.icon}
                            style={btn.style}
                            onClick={() => btn.onClick(setOpen, navigate)}
                        />
                    ))}
                </div>
            </div>

            <FilterModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onApply={apply}
                availableTags={availableTags}
                availableCategories={availableCategories}
                initial={filters}
            />
        </div>
    );
}

function ActionButton({ label, icon, onClick, style }) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-md transition-all ${style}`}
        >
            <span className="text-lg">{icon}</span>
            <span>{label}</span>
        </button>
    );
}
