import { useEffect, useState } from "react";
import { BarChart3, User, Settings, Bell } from "lucide-react";

export default function Navbar() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="navbar">
      <div className="container">
        <div className="navbar-content">
          <div className="navbar-brand">
            <BarChart3 size={32} />
            <span>Claims Dashboard</span>
          </div>

          <nav className="navbar-nav">
            <li>
              <a href="#dashboard" className="nav-link">
                Dashboard
              </a>
            </li>
            <li>
              <a href="#claims" className="nav-link">
                Claims
              </a>
            </li>
            <li>
              <a href="#analytics" className="nav-link">
                Analytics
              </a>
            </li>
            <li>
              <a href="#reports" className="nav-link">
                Reports
              </a>
            </li>
          </nav>

          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600 hidden md:block">
              {currentTime.toLocaleTimeString()}
            </div>

            <button className="nav-link flex items-center gap-2">
              <Bell size={18} />
              <span className="hidden sm:inline">Notifications</span>
            </button>

            <button className="nav-link flex items-center gap-2">
              <Settings size={18} />
              <span className="hidden sm:inline">Settings</span>
            </button>

            <button className="nav-link flex items-center gap-2">
              <User size={18} />
              <span className="hidden sm:inline">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
