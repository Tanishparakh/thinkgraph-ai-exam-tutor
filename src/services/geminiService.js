const MAX_INPUT_LENGTH = 3000;

async function analyze(payload) {
  if (!payload.inputText || !payload.inputText.trim()) {
    throw new Error("Please enter a question or argument first.");
  }
  if (payload.inputText.length > MAX_INPUT_LENGTH) {
    throw new Error("This input is very long. Try shortening it for better analysis.");
  }

  try {
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Could not complete the analysis.");
    }
    return data;
  } catch (error) {
    const knownMessages = [
      "Please enter",
      "very long",
      "API key",
      "unreadable",
      "Too many requests",
    ];
    if (knownMessages.some((message) => error.message.includes(message))) {
      throw error;
    }
    throw new Error(
      "Could not connect to Gemini. Please check your internet or API key.",
      { cause: error }
    );
  }
}

export function analyzeArgument(inputText) {
  return analyze({ mode: "logic", inputText });
}

export function solveExamQuestion({
  inputText,
  testType,
  questionType,
  studentAnswer,
  domain,
  category,
}) {
  return analyze({
    mode: "exam",
    inputText,
    testType,
    questionType,
    studentAnswer,
    domain,
    category,
  });
}
