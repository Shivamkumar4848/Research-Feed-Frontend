import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FilterModal from "../components/FilterModal";
import useFilters from "../hooks/useFilters";
import data from "../data/dummyData.json";

export default function Dashboard() {
    const navigate = useNavigate();
    const { filters, updateFilters } = useFilters();
    const [open, setOpen] = useState(true); // Ask filters on first visit

    const availableTags = [...new Set(data.flatMap(a => a.tags))];
    const availableCategories = [...new Set(data.flatMap(a => a.category))];

    const apply = (f) => {
        updateFilters(f);
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Dashboard</h2>
            <p className="text-gray-700 dark:text-gray-300">
                Welcome! Set your preferred filters below — we’ll use them across the app.
            </p>

            <div className="flex items-center justify-center">
                <div className="flex gap-3">
                    <button
                        onClick={() => setOpen(true)}
                        className="px-3 py-1.5 rounded bg-violet-600 text-white hover:bg-violet-700"
                    >
                        Set Filters
                    </button>
                    <button
                        onClick={() => navigate("/articles")}
                        className="px-3 py-1.5 rounded bg-gray-200 dark:bg-gray-700"
                    >
                        View Articles
                    </button>
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
