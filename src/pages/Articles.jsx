import { useEffect, useMemo, useState } from "react";
import ArticleCard from "../components/ArticleCard";
import Loader from "../components/Loader";
import FilterModal from "../components/FilterModal";
import FilterBar from "../components/FilterBar";
import Pagination from "../components/Pagination";
import useFilters from "../hooks/useFilters";
import data from "../data/dummyData.json";

export default function Articles() {
    const { filters, updateFilters } = useFilters();
    const [showModal, setShowModal] = useState(!filters || (!filters.tags?.length && !filters.categories?.length && !filters.startDate && !filters.endDate));
    const [loading, setLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const availableTags = useMemo(() => [...new Set(data.flatMap(a => a.tags))], []);
    const availableCategories = useMemo(() => [...new Set(data.flatMap(a => a.category))], []);

    useEffect(() => {
        const t = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(t);
    }, []);

    const filtered = useMemo(() => {
        return data.filter(article => {
            const hasMatchingTag =
                filters.tags?.length === 0 ||
                filters.tags.some(tag => article.tags?.includes(tag));

            const hasMatchingCategory =
                filters.categories?.length === 0 ||
                filters.categories.some(cat => article.category?.includes(cat));

            const pubDate = new Date(article.publication_date);
            const inStartRange = !filters.startDate || pubDate >= new Date(filters.startDate);
            const inEndRange = !filters.endDate || pubDate <= new Date(filters.endDate);

            return hasMatchingTag && hasMatchingCategory && inStartRange && inEndRange;
        });
    }, [filters]);

    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const paginatedArticles = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const apply = (f) => updateFilters(f);

    if (loading) return <Loader />;

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Articles</h2>

            <FilterBar filters={filters} onOpen={() => setShowModal(true)} />

            {filtered.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400">No articles match your filters.</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
                        {paginatedArticles.map((article, idx) => (
                            <ArticleCard key={idx} article={article} />
                        ))}
                    </div>

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </>
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
