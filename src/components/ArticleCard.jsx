import { useState, useEffect } from "react";
import { FaRegFileAlt } from "react-icons/fa";
import Modal from "./Modal";

export default function ArticleCard({ article }) {
    const [loading, setLoading] = useState(false);
    const [summary, setSummary] = useState("");
    const [error, setError] = useState("");
    const [isFlipped, setIsFlipped] = useState(false);
    const [showAbstractModal, setShowAbstractModal] = useState(false);
    const [showTagsModal, setShowTagsModal] = useState(false);
    const [showCategoriesModal, setShowCategoriesModal] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem(`summary-${article.doi}`);
        if (stored) setSummary(stored);
    }, [article.doi]);

    const handleSummarize = async () => {
        if (summary) {
            setIsFlipped(true);
            return;
        }

        setIsFlipped(true);
        setLoading(true);
        setSummary("");
        setError("");

        try {
            const res = await fetch("http://localhost:5000/api/summarize", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ abstract: article.abstract }),
            });
            const data = await res.json();
            if (res.ok) {
                setSummary(data.summary || "No summary returned.");
                localStorage.setItem(`summary-${article.doi}`, data.summary);
            } else {
                setError("Failed to summarize.");
            }
        } catch {
            setError("Could not fetch summary.");
        } finally {
            setLoading(false);
        }
    };

    const formatWithLimit = (items, limit = 2) => {
        if (!items || items.length === 0) return [];
        if (items.length <= limit) return items;
        return [...items.slice(0, limit), `+${items.length - limit}`];
    };

    return (
        <>
            <div className="w-full max-w-sm h-[440px] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl rounded-lg relative">
                <div className="perspective w-full h-full">
                    <div
                        className={`relative w-full h-full transition-transform duration-700 ${isFlipped ? "rotate-y-180" : ""
                            }`}
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        <div
                            className="absolute w-full h-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 border border-gray-200 dark:border-gray-700 flex flex-col"
                            style={{ backfaceVisibility: "hidden" }}
                        >
                            <h2 className="text-lg font-semibold leading-tight dark:text-white truncate-2">
                                {article.title}
                            </h2>
                            <p className="text-gray-500 dark:text-gray-400 text-xs mb-2">
                                {article.journal} • {article.publication_date}
                            </p>

                            {article.authors?.length > 0 && (
                                <p className="text-xs text-gray-700 dark:text-gray-300 mb-2">
                                    <span className="font-semibold">AUTHOR:</span>{" "}
                                    {article.authors.join(", ")}
                                </p>
                            )}

                            <div className="mb-2 flex flex-wrap gap-2">
                                {formatWithLimit(article.category).map((cat, idx) =>
                                    cat.startsWith("+") ? (
                                        <button
                                            key={idx}
                                            onClick={() => setShowCategoriesModal(true)}
                                            className="bg-green-100 text-green-800 px-2 py-0.5 text-xs rounded-full hover:bg-green-200"
                                        >
                                            {cat}
                                        </button>
                                    ) : (
                                        <span
                                            key={idx}
                                            className="bg-green-100 text-green-800 px-2 py-0.5 text-xs rounded-full"
                                        >
                                            {cat}
                                        </span>
                                    )
                                )}
                            </div>

                            <div className="mb-2 flex flex-wrap gap-2">
                                {formatWithLimit(article.tags).map((tag, idx) =>
                                    tag.startsWith("+") ? (
                                        <button
                                            key={idx}
                                            onClick={() => setShowTagsModal(true)}
                                            className="bg-blue-100 text-blue-800 px-2 py-0.5 text-xs rounded-full hover:bg-blue-200"
                                        >
                                            {tag}
                                        </button>
                                    ) : (
                                        <span
                                            key={idx}
                                            className="bg-blue-100 text-blue-800 px-2 py-0.5 text-xs rounded-full"
                                        >
                                            #{tag}
                                        </span>
                                    )
                                )}
                            </div>

                            <p className="text-blue-500 underline text-sm truncate">
                                <a
                                    href={`https://doi.org/${article.doi}`}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {article.doi}
                                </a>
                            </p>

                            <div className="relative flex-1">
                                <p className="mt-1 text-sm text-gray-800 dark:text-gray-300 truncate-3">
                                    <span className="font-medium text-violet-400">Abstract:</span>{" "}
                                    {article.abstract}
                                </p>
                                <button
                                    onClick={() => setShowAbstractModal(true)}
                                    className="absolute bottom-0 right-0 text-xs text-violet-600 underline bg-white dark:bg-gray-800 px-1"
                                >
                                    Read More
                                </button>
                            </div>

                            {summary ? (
                                <p className="mt-1 text-sm text-gray-800 dark:text-gray-300 truncate-3 flex-1">
                                    <span className="font-medium text-emerald-500">Summary:</span>{" "}
                                    {summary}
                                </p>
                            ) : (
                                <div className="flex flex-col justify-center items-center flex-1 text-gray-400">
                                    <FaRegFileAlt className="text-5xl mb-2" />
                                    <p>No summary yet</p>
                                </div>
                            )}

                            <button
                                onClick={handleSummarize}
                                disabled={loading}
                                className="mt-3 px-3 py-1.5 text-sm bg-violet-600 text-white rounded hover:bg-violet-700 disabled:opacity-50"
                            >
                                {summary ? "Show Summary" : "Summarize"}
                            </button>
                        </div>

                        <div
                            className="absolute w-full h-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 border border-gray-200 dark:border-gray-700 rotate-y-180 flex flex-col justify-center items-center text-center"
                            style={{ backfaceVisibility: "hidden" }}
                        >
                            {loading && (
                                <>
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600 mb-3"></div>
                                    <p className="text-gray-700 dark:text-gray-300">
                                        Summarizing...
                                    </p>
                                </>
                            )}

                            {!loading && summary && (
                                <>
                                    <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-2 border-b border-emerald-400">
                                        Summary
                                    </h3>
                                    <div className="flex-1 my-2 overflow-y-auto text-justify text-sm text-gray-700 dark:text-gray-300 max-h-56">
                                        {summary}
                                    </div>
                                    <button
                                        onClick={() => setIsFlipped(false)}
                                        className="mt-3 px-3 py-1 text-sm bg-violet-600 text-white rounded hover:bg-violet-700"
                                    >
                                        Back
                                    </button>
                                </>
                            )}

                            {!loading && error && (
                                <>
                                    <p className="text-red-500">{error}</p>
                                    <button
                                        onClick={() => setIsFlipped(false)}
                                        className="mt-3 px-3 py-1 text-sm bg-violet-600 text-white rounded hover:bg-violet-700"
                                    >
                                        Back
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <style>{`
          .perspective { perspective: 1000px; }
          .rotate-y-180 { transform: rotateY(180deg); }
        `}</style>
            </div>

            {showAbstractModal && (
                <Modal title="Full Abstract" onClose={() => setShowAbstractModal(false)}>
                    <p className="text-sm text-gray-700 dark:text-gray-300 text-justify whitespace-pre-line">
                        {article.abstract}
                    </p>
                </Modal>
            )}

            {showTagsModal && (
                <Modal title="All Tags" onClose={() => setShowTagsModal(false)}>
                    <div className="flex flex-wrap gap-2">
                        {article.tags?.map((tag, i) => (
                            <span
                                key={i}
                                className="bg-blue-100 text-blue-800 px-2 py-0.5 text-xs rounded-full"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                </Modal>
            )}

            {showCategoriesModal && (
                <Modal
                    title="All Categories"
                    onClose={() => setShowCategoriesModal(false)}
                >
                    <div className="flex flex-wrap gap-2">
                        {article.category?.map((cat, i) => (
                            <span
                                key={i}
                                className="bg-green-100 text-green-800 px-2 py-0.5 text-xs rounded-full"
                            >
                                {cat}
                            </span>
                        ))}
                    </div>
                </Modal>
            )}
        </>
    );
}
