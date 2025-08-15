import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Articles from "./pages/Articles";
import Settings from "./pages/Settings";
import useDarkMode from "./hooks/useDarkMode";

export default function App() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className={`min-h-screen w-full transition-colors duration-500 ${darkMode ? "dark bg-gray-900" : "bg-gray-100"}`}>
        <div className="flex">
          <Sidebar
            isOpen={sidebarOpen}
            closeSidebar={() => setSidebarOpen(false)}
          />
          <div className="flex-1 min-h-screen flex flex-col sm:ml-64">
            <Navbar
              darkMode={darkMode}
              toggleDarkMode={toggleDarkMode}
              onHamburger={() => setSidebarOpen(true)}
            />
            <main className="flex-1 p-6 text-gray-900 dark:text-gray-100">
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/articles" element={<Articles />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </Router>
  );
}
