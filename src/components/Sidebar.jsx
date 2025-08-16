import { NavLink } from "react-router-dom";
import { FaHome, FaNewspaper, FaCog } from "react-icons/fa";

const menuItems = [
    { label: "Dashboard", path: "/dashboard", icon: <FaHome /> },
    { label: "Articles", path: "/articles", icon: <FaNewspaper /> },
    { label: "Settings", path: "/settings", icon: <FaCog /> },
];

export default function Sidebar({ isOpen, closeSidebar }) {
    return (
        <>
            <div
                onClick={closeSidebar}
                className={`fixed inset-0 bg-black/40 z-40 lg:hidden ${isOpen ? "block" : "hidden"
                    }`}
            />
            <aside
                className={`fixed top-0 left-0 z-50 w-64 h-full bg-white dark:bg-gray-800 shadow-md border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-200 
          lg:translate-x-0 lg:block
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div className="p-4 flex flex-col h-full">
                    <div className="text-2xl font-bold font-mono mb-6 cursor-default">
                        <span className="text-violet-600">Research</span>
                        <span className="text-gray-900 dark:text-gray-100">Feed</span>
                    </div>
                    <nav className="flex flex-col gap-2">
                        {menuItems.map((item) => (
                            <SideLink
                                key={item.path}
                                to={item.path}
                                label={item.label}
                                icon={item.icon}
                            />
                        ))}
                    </nav>
                    <div className="mt-auto text-xs text-gray-500 dark:text-gray-400">
                        v1.0
                    </div>
                </div>
            </aside>
        </>
    );
}

function SideLink({ to, label, icon }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded transition-colors ${isActive
                    ? "bg-violet-600 text-white"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`
            }
        >
            <span className="text-lg">{icon}</span>
            <span>{label}</span>
        </NavLink>
    );
}
