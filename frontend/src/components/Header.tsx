import React from "react";

const Header: React.FC = () => {
  return (
    <header className="relative z-10 border-b border-border-default bg-bg-secondary/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo + App name */}
        <div className="flex items-center gap-3">
          {/* Animated logo mark */}
          <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-accent-blue to-accent-purple shadow-lg shadow-accent-blue/20">
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
            {/* Glow ring */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 blur-md" />
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-tight sm:text-xl">
              <span className="bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent">
                AlgoU
              </span>{" "}
              <span className="text-text-primary">Online Compiler</span>
            </h1>
            <p className="hidden text-xs text-text-muted sm:block">
              Write · Compile · Review — C++ in your browser
            </p>
          </div>
        </div>

        {/* Right side — status badge */}
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-full border border-accent-green/30 bg-accent-green/10 px-3 py-1 text-xs font-medium text-accent-green">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-accent-green" />
            C++17
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
