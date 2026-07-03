import React from "react";
import MonacoEditor from "@monaco-editor/react";

interface EditorProps {
  code: string;
  onChange: (value: string) => void;
}

const Editor: React.FC<EditorProps> = ({ code, onChange }) => {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-border-default bg-bg-card shadow-lg shadow-black/8">
      {/* Tab bar */}
      <div className="flex items-center gap-2 border-b border-border-default bg-bg-secondary px-4 py-2">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-accent-red/70" />
          <span className="h-3 w-3 rounded-full bg-accent-amber/70" />
          <span className="h-3 w-3 rounded-full bg-accent-green/70" />
        </div>
        <div className="ml-3 flex items-center gap-2 rounded-md bg-bg-tertiary px-3 py-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5 text-accent-blue"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          <span className="text-xs font-medium text-text-secondary">
            main.cpp
          </span>
        </div>
      </div>

      {/* Editor area */}
      <div className="flex-1 min-h-0">
        <MonacoEditor
          height="100%"
          language="cpp"
          theme="vs-dark"
          value={code}
          onChange={(value) => onChange(value ?? "")}
          options={{
            fontSize: 14,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            fontLigatures: true,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            padding: { top: 16, bottom: 16 },
            lineNumbers: "on",
            glyphMargin: false,
            folding: true,
            lineDecorationsWidth: 8,
            renderLineHighlight: "gutter",
            automaticLayout: true,
            bracketPairColorization: { enabled: true },
            smoothScrolling: true,
            cursorBlinking: "smooth",
            cursorSmoothCaretAnimation: "on",
            wordWrap: "on",
          }}
        />
      </div>
    </div>
  );
};

export default Editor;
