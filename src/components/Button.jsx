export default function Button({
    children,
    onClick,
    variant = "primary",
    icon,
    className = "",
    ...props
}) {
    const baseStyles =
        "flex items-center gap-2 px-3 py-1.5 rounded font-medium transition-colors";

    const variants = {
        primary: "bg-violet-600 text-white hover:bg-violet-700",
        secondary: "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200",
        outline:
            "border border-violet-600 text-violet-600 hover:bg-violet-50 dark:hover:bg-gray-800",
        danger: "bg-red-600 text-white hover:bg-red-700",
    };

    return (
        <button
            onClick={onClick}
            className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
            {...props}
        >
            {icon && <span className="text-lg">{icon}</span>}
            {children}
        </button>
    );
}
