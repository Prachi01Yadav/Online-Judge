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
  try {
    const response = await fetch("http://localhost:8080/api/compile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code, input }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching execution result:", error);
    return {
      stdout: "",
      stderr: "Error connecting to the execution service. Make sure your backend is running!",
      exitCode: 1,
      timeMs: 0
    };
  }
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

