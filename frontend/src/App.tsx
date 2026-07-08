import React, { useState, useCallback } from "react";
import Header from "./components/Header";
import Editor from "./components/Editor";
import InputPanel from "./components/InputPanel";
import OutputPanel from "./components/OutputPanel";
import AiReviewPanel from "./components/AiReviewPanel";
import { compileCode, reviewCode } from "./api/client";

const DEFAULT_CODE = `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}
`;

const App: React.FC = () => {
  // Editor state
  const [code, setCode] = useState(DEFAULT_CODE);
  const [input, setInput] = useState("");

  // Output state
  const [stdout, setStdout] = useState("");
  const [stderr, setStderr] = useState("");
  const [exitCode, setExitCode] = useState<number | null>(null);
  const [timeMs, setTimeMs] = useState<number | null>(null);

  // AI review state
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showReview, setShowReview] = useState(false);

  // Loading states
  const [isRunning, setIsRunning] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);

  const handleRun = useCallback(async () => {
    setIsRunning(true);
    setStdout("");
    setStderr("");
    setExitCode(null);
    setTimeMs(null);

    try {
      const result = await compileCode(code, input);
      setStdout(result.stdout);
      setStderr(result.stderr);
      setExitCode(result.exitCode);
      setTimeMs(result.timeMs);
    } catch {
      setStderr("An unexpected error occurred while compiling.");
      setExitCode(1);
    } finally {
      setIsRunning(false);
    }
  }, [code, input]);

  const handleReview = useCallback(async () => {
    setIsReviewing(true);
    setSuggestions([]);
    setShowReview(true);

    try {
      const result = await reviewCode(code);
      setSuggestions(result.suggestions);
    } catch {
      setSuggestions(["Failed to retrieve AI review. Please try again."]);
    } finally {
      setIsReviewing(false);
    }
  }, [code]);

  const handleReset = useCallback(() => {
    setCode(DEFAULT_CODE);
    setInput("");
    setStdout("");
    setStderr("");
    setExitCode(null);
    setTimeMs(null);
    setSuggestions([]);
    setShowReview(false);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-bg-primary">
      <Header />

      <main className="flex-1 mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 sm:py-8">
        {/* Two-column layout: 60% editor, 40% I/O */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[3fr_2fr]" style={{ minHeight: 'calc(100vh - 140px)' }}>

          {/* Left column: Editor + Reset button */}
          <div className="flex flex-col gap-4">
            <div className="min-h-[400px] lg:min-h-0 flex-1">
              <Editor code={code} onChange={setCode} />
            </div>
            <button
              onClick={handleReset}
              className="flex self-start items-center justify-center gap-2 rounded-lg border border-border-default bg-bg-tertiary px-8 py-3 text-base font-semibold text-text-secondary transition-all duration-200 hover:border-text-muted hover:text-text-primary hover:bg-bg-hover active:scale-[0.98] cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4.5 w-4.5"
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
              Reset Code
            </button>
          </div>

          {/* Right column: Input + Run + Output + AI Review button */}
          <div className="flex flex-col gap-4">
            {/* Input panel */}
            <InputPanel value={input} onChange={setInput} />

            {/* Run button — right below input */}
            <button
              onClick={handleRun}
              disabled={isRunning}
              className="flex self-start items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-accent-green to-[#2d5238] px-8 py-3 text-base font-semibold text-white shadow-lg shadow-accent-green/25 transition-all duration-200 hover:shadow-accent-green/40 hover:brightness-110 active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
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
              {isRunning ? "Running..." : "Run Code"}
            </button>

            {/* Output panel */}
            <OutputPanel
              stdout={stdout}
              stderr={stderr}
              exitCode={exitCode}
              timeMs={timeMs}
              isLoading={isRunning}
            />

            {/* AI Review button */}
            <button
              onClick={handleReview}
              disabled={isReviewing}
              className="flex self-start items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#3b302a] to-[#1e1814] px-8 py-3 text-base font-semibold text-white shadow-lg shadow-[#3b302a]/25 transition-all duration-200 hover:shadow-[#3b302a]/40 hover:brightness-110 active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
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

            {/* AI Review results (shown after clicking AI Review) */}
            {showReview && (
              <AiReviewPanel
                suggestions={suggestions}
                isLoading={isReviewing}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;

