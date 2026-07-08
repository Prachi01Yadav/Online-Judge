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


export async function reviewCode(code: string): Promise<ReviewResult> {
  try {
    const response = await fetch("http://localhost:8080/api/review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { suggestions: data.suggestions || [] };
    
  } catch (error) {
    console.error("Error fetching AI review:", error);
    return { 
      suggestions: ["Error connecting to the AI review service. Make sure your backend is running!"] 
    };
  }
}

