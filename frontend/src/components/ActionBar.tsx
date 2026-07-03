import React from "react";

interface ActionBarProps {
  onRun: () => void;
  onReview: () => void;
  onReset: () => void;
  isRunning: boolean;
  isReviewing: boolean;
}

const ActionBar: React.FC<ActionBarProps> = ({
  onRun,
  onReview,
  onReset,
  isRunning,
  isReviewing,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Run button */}
      <button
        onClick={onRun}
        disabled={isRunning}
        className="group relative flex items-center gap-2 rounded-lg bg-gradient-to-r from-accent-green to-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-accent-green/25 transition-all duration-200 hover:shadow-accent-green/40 hover:brightness-110 active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
      >
        {isRunning ? (
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        )}
        {isRunning ? "Running..." : "Run"}
      </button>

      {/* AI Review button */}
      <button
        onClick={onReview}
        disabled={isReviewing}
        className="group flex items-center gap-2 rounded-lg bg-gradient-to-r from-accent-purple to-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-accent-purple/25 transition-all duration-200 hover:shadow-accent-purple/40 hover:brightness-110 active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
      >
        {isReviewing ? (
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2a4 4 0 0 0-4 4c0 2 1.5 3.5 2 5h4c.5-1.5 2-3 2-5a4 4 0 0 0-4-4z" />
            <path d="M10 17v1a2 2 0 1 0 4 0v-1" />
            <line x1="10" y1="11" x2="14" y2="11" />
            <line x1="10" y1="14" x2="14" y2="14" />
          </svg>
        )}
        {isReviewing ? "Reviewing..." : "AI Review"}
      </button>

      {/* Reset button */}
      <button
        onClick={onReset}
        className="flex items-center gap-2 rounded-lg border border-border-default bg-bg-tertiary px-5 py-2.5 text-sm font-medium text-text-secondary transition-all duration-200 hover:border-text-muted hover:text-text-primary active:scale-[0.97] cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="1 4 1 10 7 10" />
          <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
        </svg>
        Reset
      </button>
    </div>
  );
};

export default ActionBar;
