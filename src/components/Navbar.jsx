import { FaBars, FaSun, FaMoon } from "react-icons/fa";

export default function Navbar({ darkMode, toggleDarkMode, onHamburger }) {
    return (
        <nav className="sticky top-0 z-30 bg-white/80 dark:bg-gray-800/80 backdrop-blur shadow-sm px-4 py-3 flex items-center justify-between">
            <button
                onClick={onHamburger}
                className="sm:hidden p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Toggle sidebar"
            >
                <FaBars className="h-5 w-5 text-gray-700 dark:text-gray-200" />
            </button>

            <h1 className="text-lg sm:text-xl font-bold text-violet-600 dark:text-white lg:invisible">
                Research<span className="text-gray-800">Feed</span>
            </h1>

            <button
                onClick={toggleDarkMode}
                className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Toggle dark mode"
            >
                {darkMode ? (
                    <FaSun className="h-5 w-5 text-yellow-400" />
                ) : (
                    <FaMoon className="h-5 w-5 text-gray-700 dark:text-gray-200" />
                )}
            </button>
        </nav>
    );
}
