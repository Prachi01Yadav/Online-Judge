import React, { useState, useCallback } from "react";
import Header from "./components/Header";
import Editor from "./components/Editor";
import InputPanel from "./components/InputPanel";
import OutputPanel from "./components/OutputPanel";
import AiReviewPanel from "./components/AiReviewPanel";
import ActionBar from "./components/ActionBar";
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
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-bg-primary">
      <Header />

      <main className="flex-1 mx-auto w-full max-w-[1600px] px-4 py-4 sm:px-6 sm:py-6">
        {/* Action bar */}
        <div className="mb-4">
          <ActionBar
            onRun={handleRun}
            onReview={handleReview}
            onReset={handleReset}
            isRunning={isRunning}
            isReviewing={isReviewing}
          />
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6" style={{ minHeight: 'calc(100vh - 180px)' }}>
          {/* Left: Code editor */}
          <div className="min-h-[400px] lg:min-h-0">
            <Editor code={code} onChange={setCode} />
          </div>

          {/* Right: stacked panels */}
          <div className="flex flex-col gap-4">
            <InputPanel value={input} onChange={setInput} />
            <OutputPanel
              stdout={stdout}
              stderr={stderr}
              exitCode={exitCode}
              timeMs={timeMs}
              isLoading={isRunning}
            />
            <AiReviewPanel
              suggestions={suggestions}
              isLoading={isReviewing}
            />
          </div>
        </div>
      </main>


    </div>
  );
};

export default App;
