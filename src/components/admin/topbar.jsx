"use client";

export default function Topbar() {
  return (
    <div className="admin-topbar">
      {/* LEFT */}
      <div className="topbar-left">
        <h5 className="mb-0">
          Welcome Back, Alex <span className="wave">👋</span>
        </h5>
        <small>Hello Alex, Hope You Fine</small>
      </div>

      {/* RIGHT */}
      <div className="topbar-right">
        {/* Search */}
        <div className="topbar-search">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input placeholder="Search..." />
        </div>

        {/* Notifications */}
        <div className="topbar-icon">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className="notify-dot" />
        </div>

        {/* Avatar */}
        <img
          src="https://i.pravatar.cc/100"
          alt="profile"
          className="topbar-avatar"
        />
      </div>
    </div>
  );
}
