import React from "react";

const Header: React.FC = () => {
  return (
    <header className="relative z-10 border-b border-border-default bg-bg-secondary/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1600px] items-center px-4 py-3 sm:px-6">
        {/* Logo + App name */}
        <div className="flex items-center gap-3">
          {/* Logo mark */}
          <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#5c4033] to-[#2c1e14] shadow-lg shadow-[#5c4033]/20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          </div>

          <h1 className="text-lg font-bold tracking-tight sm:text-xl">
            <span className="text-[#3b2516]">
              AlgoU
            </span>{" "}
            <span className="text-text-primary">Online Judge</span>
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
