import React, { useState } from "react";

interface AiReviewPanelProps {
  suggestions: string[];
  isLoading: boolean;
}

const AiReviewPanel: React.FC<AiReviewPanelProps> = ({
  suggestions,
  isLoading,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="rounded-xl border border-border-default bg-bg-card shadow-md shadow-black/5 overflow-hidden">
      {/* Collapsible header */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between border-b border-border-default bg-bg-secondary px-4 py-2.5 transition-colors hover:bg-bg-hover cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-accent-purple"
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
          <span className="text-sm font-semibold text-text-primary">
            AI Code Review
          </span>
          {suggestions.length > 0 && (
            <span className="rounded-full bg-accent-purple/20 px-2 py-0.5 text-[10px] font-bold text-accent-purple">
              {suggestions.length}
            </span>
          )}
        </div>

        {/* Chevron */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 text-text-muted transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Collapsible body */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-3">
          {isLoading ? (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm text-text-muted">
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-accent-purple border-t-transparent" />
                Analyzing code with AI...
              </div>
              <div className="skeleton h-14 w-full" />
              <div className="skeleton h-14 w-full" />
              <div className="skeleton h-14 w-3/4" />
            </div>
          ) : suggestions.length > 0 ? (
            <ul className="flex flex-col gap-2">
              {suggestions.map((s, i) => (
                <li
                  key={i}
                  className="animate-fade-in flex gap-3 rounded-lg border border-border-default bg-bg-tertiary/50 p-3"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent-purple/20 text-[10px] font-bold text-accent-purple">
                    {i + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {s}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm italic text-text-muted">
              Click "AI Review" to get intelligent suggestions for your
              code...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AiReviewPanel;
