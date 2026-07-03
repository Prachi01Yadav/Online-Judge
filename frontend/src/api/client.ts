// api/client.ts
// Mock API client for AlgoU Online Compiler.
// When a real backend (e.g., Java Spring Boot) is available,
// replace the mock implementations below with actual HTTP calls.
// No other files need to change.

export interface CompileResult {
  stdout: string;
  stderr: string;
  exitCode: number;
  timeMs: number;
}

export interface ReviewResult {
  suggestions: string[];
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Sends code + optional stdin to the compiler backend.
 * Currently returns mock data after a simulated delay.
 */
export async function compileCode(
  code: string,
  input: string
): Promise<CompileResult> {
  await delay(1000 + Math.random() * 500);

  // Simulate a compilation error when the code contains obvious syntax issues
  const hasSyntaxError =
    !code.includes("int main") && !code.includes("int Main");

  if (hasSyntaxError) {
    return {
      stdout: "",
      stderr:
        "error: 'main' must return 'int'\n" +
        "note: C++ requires a function named 'main' to be the entry point",
      exitCode: 1,
      timeMs: 42,
    };
  }

  return {
    stdout: input
      ? `Hello, World!\nYou entered: ${input}`
      : "Hello, World!\n",
    stderr: "",
    exitCode: 0,
    timeMs: 127,
  };
}

/**
 * Sends code to the AI review endpoint.
 * Currently returns mock suggestions after a simulated delay.
 */
export async function reviewCode(code: string): Promise<ReviewResult> {
  await delay(1200 + Math.random() * 300);

  // Return different suggestions based on code content for a more realistic feel
  const suggestions: string[] = [
    "Consider using `const` references for parameters that don't need to be modified to avoid unnecessary copies.",
    "Add input validation before processing user data to prevent undefined behavior.",
    "The `using namespace std;` directive pulls all names into the global scope — prefer explicit `std::` prefixes in production code.",
  ];

  if (code.includes("cout")) {
    suggestions.push(
      "Use `'\\n'` instead of `std::endl` when you don't need to flush the buffer — it's faster."
    );
  }

  if (!code.includes("return 0")) {
    suggestions.push(
      "While C++11 implicitly returns 0 from `main`, adding an explicit `return 0;` improves readability."
    );
  }

  return { suggestions };
}
