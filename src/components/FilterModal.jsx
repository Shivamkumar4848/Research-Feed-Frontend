import { useEffect, useState, useMemo } from "react";

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

    const [tagSearch, setTagSearch] = useState("");
    const [categorySearch, setCategorySearch] = useState("");

    useEffect(() => {
        setTags(initial.tags || []);
        setCategories(initial.categories || []);
        setStartDate(initial.startDate || "");
        setEndDate(initial.endDate || "");
        setTagSearch("");
        setCategorySearch("");
    }, [initial, isOpen]);

    const filteredTags = useMemo(() =>
        availableTags.filter(tag => tag.toLowerCase().includes(tagSearch.toLowerCase())),
        [availableTags, tagSearch]
    );

    const filteredCategories = useMemo(() =>
        availableCategories.filter(cat => cat.toLowerCase().includes(categorySearch.toLowerCase())),
        [availableCategories, categorySearch]
    );

    if (!isOpen) return null;

    const toggle = (val, list, setList) =>
        setList(list.includes(val) ? list.filter(v => v !== val) : [...list, val]);

    const apply = () => {
        onApply({ tags, categories, startDate, endDate });
        onClose();
    };

    const clearFilters = () => {
        setTags([]);
        setCategories([]);
        setStartDate("");
        setEndDate("");
        onApply({ tags: [], categories: [], startDate: "", endDate: "" });
        onClose();
    };


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl max-h-[80vh] overflow-y-auto">
                <h2 className="text-lg font-semibold mb-4">Set Filters</h2>
                <section className="mb-4">
                    <p className="mb-2 font-medium">Tags</p>
                    <input
                        type="text"
                        value={tagSearch}
                        onChange={e => setTagSearch(e.target.value)}
                        placeholder="Search tags..."
                        className="w-full mb-2 px-2 py-1 border rounded dark:bg-gray-900 dark:border-gray-700"
                    />
                    <div className="h-32 overflow-y-auto p-1 border rounded dark:border-gray-700">
                        <div className="flex flex-wrap gap-2">
                            {filteredTags.length ? (
                                filteredTags.map(tag => (
                                    <button
                                        key={tag}
                                        onClick={() => toggle(tag, tags, setTags)}
                                        className={`px-3 py-1 rounded-full border text-sm
            ${tags.includes(tag)
                                                ? "bg-violet-600 text-white border-violet-600"
                                                : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 border-transparent"}`}
                                    >
                                        {tag}
                                    </button>
                                ))
                            ) : (
                                <p className="text-gray-500 text-sm">No matching tags</p>
                            )}
                        </div>
                    </div>

                </section>

                <section className="mb-4">
                    <p className="mb-2 font-medium">Categories</p>
                    <input
                        type="text"
                        value={categorySearch}
                        onChange={e => setCategorySearch(e.target.value)}
                        placeholder="Search categories..."
                        className="w-full mb-2 px-2 py-1 border rounded dark:bg-gray-900 dark:border-gray-700"
                    />
                    <div className="h-32 overflow-y-auto p-1 border rounded dark:border-gray-700">
                        <div className="flex flex-wrap gap-2">
                            {filteredCategories.length ? (
                                filteredCategories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => toggle(cat, categories, setCategories)}
                                        className={`px-3 py-1 rounded-full border text-sm
            ${categories.includes(cat)
                                                ? "bg-violet-600 text-white border-violet-600"
                                                : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 border-transparent"}`}
                                    >
                                        {cat}
                                    </button>
                                ))
                            ) : (
                                <p className="text-gray-500 text-sm">No matching categories</p>
                            )}
                        </div>
                    </div>

                </section>

                <section className="mb-6">
                    <p className="mb-2 font-medium">Publication Date Range</p>
                    <div className="flex flex-col sm:flex-row items-center gap-2">
                        <input
                            type="date"
                            value={startDate}
                            onChange={e => setStartDate(e.target.value)}
                            className="flex-1 border rounded px-2 py-1 bg-white dark:bg-gray-900 dark:border-gray-700"
                        />
                        <span className="text-gray-500 dark:text-gray-400 mx-1 sm:mx-2">to</span>
                        <input
                            type="date"
                            value={endDate}
                            onChange={e => setEndDate(e.target.value)}
                            className="flex-1 border rounded px-2 py-1 bg-white dark:bg-gray-900 dark:border-gray-700"
                        />
                    </div>
                </section>


                <div className="flex flex-col sm:flex-row gap-2 justify-center sm:justify-center lg:justify-end mt-4">
                    <button
                        onClick={clearFilters}
                        className="px-3 py-1.5 rounded bg-red-500 text-white hover:bg-red-600"
                    >
                        Clear
                    </button>
                    <button
                        onClick={onClose}
                        className="px-3 py-1.5 rounded bg-gray-200 dark:bg-gray-700"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={apply}
                        className="px-3 py-1.5 rounded bg-violet-600 text-white hover:bg-violet-700"
                    >
                        Apply
                    </button>
                </div>

            </div>
        </div>
    );
}
