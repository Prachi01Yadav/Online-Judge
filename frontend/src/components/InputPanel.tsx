import React from "react";

interface InputPanelProps {
  value: string;
  onChange: (value: string) => void;
}

const InputPanel: React.FC<InputPanelProps> = ({ value, onChange }) => {
  return (
    <div className="flex flex-col rounded-xl border border-border-default bg-bg-card shadow-md shadow-black/5 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-border-default bg-bg-secondary px-4 py-2.5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-accent-amber"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
        </svg>
        <span className="text-sm font-semibold text-text-primary">
          Custom Input
        </span>
        <span className="text-xs text-text-muted">(stdin)</span>
      </div>

      {/* Textarea */}
      <textarea
        className="flex-1 min-h-[100px] resize-none bg-transparent px-4 py-3 font-mono text-sm text-text-primary placeholder:text-text-muted/50 focus:outline-none"
        placeholder="Enter your input here..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
      />
    </div>
  );
};

export default InputPanel;
