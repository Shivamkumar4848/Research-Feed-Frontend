export default function FilterBar({ filters, onOpen }) {
    const { tags = [], categories = [], startDate, endDate } = filters || {};
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <div className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">Filters:</span>{" "}
                {tags.length ? `Tags: ${tags.join(", ")} • ` : ""}
                {categories.length ? `Categories: ${categories.join(", ")} • ` : ""}
                {(startDate || endDate) ? `Date: ${startDate || "…"} → ${endDate || "…"} ` : ""}
                {!tags.length && !categories.length && !startDate && !endDate ? "None" : ""}
            </div>
            <button
                onClick={onOpen}
                className="self-start sm:self-auto px-3 py-1.5 rounded bg-violet-600 text-white hover:bg-violet-700"
            >
                Change Filters
            </button>
        </div>
    );
}
