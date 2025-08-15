import { useState } from "react";

export default function ArticleCard({ article }) {
    const [loading, setLoading] = useState(false);
    const [summary, setSummary] = useState("");
    const [error, setError] = useState("");
    const [isFlipped, setIsFlipped] = useState(false);

    const handleSummarize = async () => {
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
            } else {
                setError("Failed to summarize.");
            }
        } catch {
            setError("Error: Could not fetch summary.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-80 h-[420px] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl rounded-lg">
            <div className="perspective w-full h-full">
                <div
                    className={`relative w-full h-full transition-transform duration-700 ${isFlipped ? "rotate-y-180" : ""}`}
                    style={{ transformStyle: "preserve-3d" }}
                >
                    {/* Front */}
                    <div
                        className="absolute w-full h-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 border border-gray-200 dark:border-gray-700 transition-colors duration-500 flex flex-col"
                        style={{ backfaceVisibility: "hidden" }}
                    >
                        <h2 className="text-lg font-semibold leading-tight dark:text-white line-clamp-2">
                            {article.title}
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 text-xs mb-1">
                            {article.journal} • {article.publication_date}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                            <span className="font-medium">Authors:</span>{" "}
                            {(article.authors || []).join(", ")}
                        </p>

                        <div className="mb-2 flex flex-wrap gap-2">
                            {(article.category || []).map((cat, idx) => (
                                <span
                                    key={idx}
                                    className="bg-green-100 text-green-800 px-2 py-0.5 text-xs rounded-full"
                                >
                                    {cat}
                                </span>
                            ))}
                        </div>
                        <div className="mb-2 flex flex-wrap gap-2">
                            {(article.tags || []).map((tag, idx) => (
                                <span
                                    key={idx}
                                    className="bg-blue-100 text-blue-800 px-2 py-0.5 text-xs rounded-full"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>

                        <p className="text-blue-500 underline text-sm truncate">
                            <a href={`https://doi.org/${article.doi}`} target="_blank" rel="noreferrer">
                                {article.doi}
                            </a>
                        </p>

                        <p className="mt-1 text-sm text-gray-800 dark:text-gray-300 line-clamp-3 flex-1">
                            <span className="font-medium">Abstract:</span> {article.abstract}
                        </p>

                        <button
                            onClick={handleSummarize}
                            disabled={loading}
                            className="mt-3 px-3 py-1.5 text-sm bg-violet-600 text-white rounded hover:bg-violet-700 disabled:opacity-50"
                        >
                            Summarize
                        </button>
                    </div>

                    {/* Back */}
                    <div
                        className="absolute w-full h-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 border border-gray-200 dark:border-gray-700 transition-colors duration-500 rotate-y-180 flex flex-col justify-center items-center text-center"
                        style={{ backfaceVisibility: "hidden" }}
                    >
                        {loading && (
                            <>
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600 mb-3"></div>
                                <p className="text-gray-700 dark:text-gray-300">Summarizing...</p>
                            </>
                        )}

                        {!loading && summary && (
                            <>
                                <p className="text-gray-800 dark:text-gray-200 overflow-y-auto max-h-56">
                                    <span className="font-medium">Summary:</span> {summary}
                                </p>
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
    );
}
