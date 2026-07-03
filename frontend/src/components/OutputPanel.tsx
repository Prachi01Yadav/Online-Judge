import React from "react";

interface OutputPanelProps {
  stdout: string;
  stderr: string;
  exitCode: number | null;
  timeMs: number | null;
  isLoading: boolean;
}

const OutputPanel: React.FC<OutputPanelProps> = ({
  stdout,
  stderr,
  exitCode,
  timeMs,
  isLoading,
}) => {
  const hasError = stderr.length > 0;
  const hasOutput = stdout.length > 0 || stderr.length > 0;

  return (
    <div
      className={`flex flex-col rounded-xl border shadow-md shadow-black/5 overflow-hidden transition-colors duration-300 ${
        hasError
          ? "border-accent-red/50 bg-accent-red/5"
          : "border-border-default bg-bg-card"
      }`}
    >
      {/* Header */}
      <div
        className={`flex items-center justify-between border-b px-4 py-2.5 ${
          hasError
            ? "border-accent-red/30 bg-accent-red/10"
            : "border-border-default bg-bg-secondary"
        }`}
      >
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 ${hasError ? "text-accent-red" : "text-accent-green"}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="4 17 10 11 4 5" />
            <line x1="12" y1="19" x2="20" y2="19" />
          </svg>
          <span className="text-sm font-semibold text-text-primary">
            Output
          </span>
          {hasError && (
            <span className="rounded-full bg-accent-red/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent-red">
              Error
            </span>
          )}
        </div>

        {/* Metadata badges */}
        {exitCode !== null && (
          <div className="flex items-center gap-2">
            <span
              className={`rounded-md px-2 py-0.5 text-[11px] font-medium ${
                exitCode === 0
                  ? "bg-accent-green/15 text-accent-green"
                  : "bg-accent-red/15 text-accent-red"
              }`}
            >
              exit {exitCode}
            </span>
            {timeMs !== null && (
              <span className="rounded-md bg-bg-tertiary px-2 py-0.5 text-[11px] font-medium text-text-muted">
                {timeMs}ms
              </span>
            )}
          </div>
        )}
      </div>

      {/* Output body */}
      <div className="min-h-[100px] px-4 py-3">
        {isLoading ? (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm text-text-muted">
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-accent-blue border-t-transparent" />
              Compiling & running...
            </div>
            <div className="skeleton h-4 w-3/4 mt-2" />
            <div className="skeleton h-4 w-1/2" />
            <div className="skeleton h-4 w-5/6" />
          </div>
        ) : hasOutput ? (
          <pre
            className={`whitespace-pre-wrap font-mono text-sm leading-relaxed ${
              hasError ? "text-accent-red" : "text-text-primary"
            }`}
          >
            {stderr || stdout}
          </pre>
        ) : (
          <p className="text-sm italic text-text-muted">
            Run your code to see output here...
          </p>
        )}
      </div>
    </div>
  );
};

export default OutputPanel;
