import { useEffect, useState } from "react";

export default function FilterModal({
    isOpen,
    onClose,
    onApply,
    availableTags = [],
    availableCategories = [],
    initial = { tags: [], categories: [], startDate: "", endDate: "" },
}) {
    const [tags, setTags] = useState(initial.tags || []);
    const [categories, setCategories] = useState(initial.categories || []);
    const [startDate, setStartDate] = useState(initial.startDate || "");
    const [endDate, setEndDate] = useState(initial.endDate || "");

    useEffect(() => {
        setTags(initial.tags || []);
        setCategories(initial.categories || []);
        setStartDate(initial.startDate || "");
        setEndDate(initial.endDate || "");
    }, [initial, isOpen]);

    if (!isOpen) return null;

    const toggle = (val, list, setList) =>
        setList(list.includes(val) ? list.filter(v => v !== val) : [...list, val]);

    const apply = () => {
        onApply({ tags, categories, startDate, endDate });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl">
                <h2 className="text-lg font-semibold mb-4">Set Filters</h2>

                <section className="mb-4">
                    <p className="mb-2 font-medium">Tags</p>
                    <div className="flex flex-wrap gap-2">
                        {availableTags.map(tag => (
                            <button
                                key={tag}
                                onClick={() => toggle(tag, tags, setTags)}
                                className={`px-3 py-1 rounded-full border text-sm
                  ${tags.includes(tag) ? "bg-violet-600 text-white border-violet-600" : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 border-transparent"}`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </section>

                <section className="mb-4">
                    <p className="mb-2 font-medium">Categories</p>
                    <div className="flex flex-wrap gap-2">
                        {availableCategories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => toggle(cat, categories, setCategories)}
                                className={`px-3 py-1 rounded-full border text-sm
                  ${categories.includes(cat) ? "bg-violet-600 text-white border-violet-600" : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 border-transparent"}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </section>

                <section className="mb-6">
                    <p className="mb-2 font-medium">Publication Date Range</p>
                    <div className="flex gap-2">
                        <input
                            type="date"
                            value={startDate}
                            onChange={e => setStartDate(e.target.value)}
                            className="flex-1 border rounded px-2 py-1 bg-white dark:bg-gray-900 dark:border-gray-700"
                        />
                        <input
                            type="date"
                            value={endDate}
                            onChange={e => setEndDate(e.target.value)}
                            className="flex-1 border rounded px-2 py-1 bg-white dark:bg-gray-900 dark:border-gray-700"
                        />
                    </div>
                </section>

                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="px-3 py-1.5 rounded bg-gray-200 dark:bg-gray-700">
                        Cancel
                    </button>
                    <button onClick={apply} className="px-3 py-1.5 rounded bg-violet-600 text-white">
                        Apply
                    </button>
                </div>
            </div>
        </div>
    );
}
