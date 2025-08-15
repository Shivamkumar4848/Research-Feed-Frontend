import { useEffect, useMemo, useState } from "react";
import ArticleCard from "../components/ArticleCard";
import Loader from "../components/Loader";
import FilterModal from "../components/FilterModal";
import FilterBar from "../components/FilterBar";
import useFilters from "../hooks/useFilters";
import data from "../data/dummyData.json";

export default function Articles() {
    const { filters, updateFilters } = useFilters();
    const [showModal, setShowModal] = useState(!filters || (!filters.tags?.length && !filters.categories?.length && !filters.startDate && !filters.endDate));
    const [loading, setLoading] = useState(true);

    const availableTags = useMemo(() => [...new Set(data.flatMap(a => a.tags))], []);
    const availableCategories = useMemo(() => [...new Set(data.flatMap(a => a.category))], []);

    // Simulate fetch delay
    useEffect(() => {
        const t = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(t);
    }, []);

    const filtered = useMemo(() => {
        return data.filter(article => {
            const byTags =
                !filters.tags?.length ||
                filters.tags.some(tag => (article.tags || []).includes(tag));

            const byCats =
                !filters.categories?.length ||
                filters.categories.some(cat => (article.category || []).includes(cat));

            const pubDate = new Date(article.publication_date);
            const afterStart = !filters.startDate || pubDate >= new Date(filters.startDate);
            const beforeEnd = !filters.endDate || pubDate <= new Date(filters.endDate);

            return byTags && byCats && afterStart && beforeEnd;
        });
    }, [filters]);

    const apply = (f) => updateFilters(f);

    if (loading) return <Loader />;

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Articles</h2>

            <FilterBar filters={filters} onOpen={() => setShowModal(true)} />

            {filtered.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400">No articles match your filters.</p>
            ) : (
                <div className="flex flex-wrap justify-start gap-6">
                    {filtered.map((article, idx) => (
                        <ArticleCard key={idx} article={article} />
                    ))}
                </div>
            )}

            <FilterModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onApply={apply}
                availableTags={availableTags}
                availableCategories={availableCategories}
                initial={filters}
            />
        </div>
    );
}
