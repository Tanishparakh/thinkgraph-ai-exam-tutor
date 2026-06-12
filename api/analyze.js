import { GoogleGenAI } from "@google/genai";
import process from "node:process";
import {
  DEFAULT_QUESTION_TYPE,
  DEFAULT_TEST_TYPE,
  QUESTION_TYPES,
  TEST_TYPES,
  getTutorGuidance,
} from "./tutorGuide.js";

const MAX_INPUT_LENGTH = 3000;
const VALID_ANSWERS = new Set(["A", "B", "C", "D"]);

const logicSchema = {
  type: "object",
  required: [
    "premises",
    "assumptions",
    "conclusion",
    "logical_relationships",
    "fallacy",
    "validity_score",
    "corrected_reasoning",
    "graph_nodes",
    "graph_edges",
  ],
  properties: {
    premises: {
      type: "array",
      items: {
        type: "object",
        required: ["id", "text"],
        properties: { id: { type: "string" }, text: { type: "string" } },
      },
    },
    assumptions: {
      type: "array",
      items: {
        type: "object",
        required: ["id", "text"],
        properties: { id: { type: "string" }, text: { type: "string" } },
      },
    },
    conclusion: {
      type: "object",
      required: ["id", "text"],
      properties: { id: { type: "string" }, text: { type: "string" } },
    },
    logical_relationships: {
      type: "array",
      items: {
        type: "object",
        required: ["from", "to", "label"],
        properties: {
          from: { type: "string" },
          to: { type: "string" },
          label: { type: "string" },
        },
      },
    },
    fallacy: {
      type: "object",
      required: ["detected", "name", "explanation", "affected_nodes"],
      properties: {
        detected: { type: "boolean" },
        name: { type: "string" },
        explanation: { type: "string" },
        affected_nodes: { type: "array", items: { type: "string" } },
      },
    },
    validity_score: { type: "number" },
    corrected_reasoning: { type: "string" },
    graph_nodes: {
      type: "array",
      items: {
        type: "object",
        required: ["id", "label", "text", "type"],
        properties: {
          id: { type: "string" },
          label: { type: "string" },
          text: { type: "string" },
          type: { type: "string" },
        },
      },
    },
    graph_edges: {
      type: "array",
      items: {
        type: "object",
        required: ["id", "source", "target", "label"],
        properties: {
          id: { type: "string" },
          source: { type: "string" },
          target: { type: "string" },
          label: { type: "string" },
        },
      },
    },
  },
};

const examSchema = {
  type: "object",
  required: [
    "test_type",
    "detected_question_type",
    "skill_tested",
    "correct_answer",
    "confidence",
    "main_point_or_rule",
    "step_by_step_solution",
    "option_analysis",
    "student_feedback",
    "teaching_tip",
    "score_improvement_tip",
    "visual_reasoning_note",
    "similar_practice_question",
  ],
  properties: {
    test_type: { type: "string" },
    detected_question_type: { type: "string" },
    skill_tested: { type: "string" },
    correct_answer: { type: "string" },
    confidence: { type: "number" },
    main_point_or_rule: { type: "string" },
    step_by_step_solution: { type: "array", items: { type: "string" } },
    option_analysis: {
      type: "array",
      items: {
        type: "object",
        required: ["option", "is_correct", "explanation"],
        properties: {
          option: { type: "string" },
          is_correct: { type: "boolean" },
          explanation: { type: "string" },
        },
      },
    },
    student_feedback: {
      type: "object",
      required: ["student_answer", "is_student_correct", "message", "likely_mistake"],
      properties: {
        student_answer: { type: "string" },
        is_student_correct: { type: ["boolean", "null"] },
        message: { type: "string" },
        likely_mistake: { type: "string" },
      },
    },
    teaching_tip: { type: "string" },
    score_improvement_tip: { type: "string" },
    visual_reasoning_note: { type: "string" },
    similar_practice_question: {
      type: "object",
      required: ["question", "options", "correct_answer", "explanation"],
      properties: {
        question: { type: "string" },
        options: {
          type: "object",
          required: ["A", "B", "C", "D"],
          properties: {
            A: { type: "string" },
            B: { type: "string" },
            C: { type: "string" },
            D: { type: "string" },
          },
        },
        correct_answer: { type: "string" },
        explanation: { type: "string" },
      },
    },
  },
};

export function buildLogicPrompt(inputText) {
  return `
You are a logic and critical-thinking tutor. Analyze the student's argument.

Definitions:
- Premise: evidence supporting another statement.
- Hidden assumption: an unstated idea required for the reasoning.
- Conclusion: the claim the argument tries to establish.
- Fallacy: a reasoning mistake that makes an inference invalid or weak.

Rules:
- Keep explanations simple and fair.
- Do not over-detect fallacies.
- Detect common errors including affirming the consequent, denying the antecedent,
  circular reasoning, ad hominem, strawman, false cause, hasty generalization,
  false dilemma, slippery slope, appeal to authority/emotion, weak analogy,
  begging the question, non sequitur, and red herring.
- Use consistent IDs. Every graph edge must reference an existing graph node.
- If no fallacy exists, set detected=false, name="None", affected_nodes=[].
- Return every field required by the JSON schema and no text outside the JSON.

Student argument:
${inputText}
`;
}

export function buildExamTutorPrompt(
  inputText,
  testType,
  questionType,
  studentAnswer
) {
  const answerInstruction = VALID_ANSWERS.has(studentAnswer)
    ? `The student selected ${studentAnswer}. Give personalized feedback and compare it with the correct answer.`
    : `The student did not select an answer. Set student_answer to "Not provided", is_student_correct to null, invite them to choose next time, and leave likely_mistake as an empty string.`;

  return `
You are an expert, patient Thinking Skills tutor for Selective School,
Opportunity Class, Cambridge-style Thinking Skills, and verbal-reasoning exams.

Context:
- Selected test type: ${testType}
- Selected question type: ${questionType}
- ${answerInstruction}

Tutor guidance:
${getTutorGuidance(questionType)}

Your task:
- Solve the complete multiple-choice question.
- If Auto Detect is selected, detect the closest supported question category.
- Explain the concept and show concise, numbered, student-friendly steps.
- Explain why the correct option is correct and every other option is wrong.
- Give a teaching tip, a practical score-improvement tip, and personalized feedback.
- Generate one new, self-contained practice question with A-D options, one correct
  answer, and an explanation. Do not reproduce or closely imitate published questions.
- If an image, diagram, chart, cube, shape, or spatial layout is needed but not fully
  described in text, solve only what the text supports, lower confidence, and clearly
  state that the answer requires manual checking against the image.
- Return every field required by the JSON schema and no text outside the JSON.

Pasted question:
${inputText}
`;
}

function cleanGeminiResponse(text) {
  let cleaned = String(text || "")
    .trim()
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();
  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");
  if (firstBrace >= 0 && lastBrace > firstBrace) {
    cleaned = cleaned.slice(firstBrace, lastBrace + 1);
  }
  return cleaned;
}

function normalizeSelection(value, allowed, fallback) {
  return allowed.includes(value) ? value : fallback;
}

function validateLogicData(data) {
  if (!data || typeof data !== "object") throw new Error("Invalid logic response");
  if (!Array.isArray(data.premises)) throw new Error("Missing premises");
  if (!Array.isArray(data.assumptions)) throw new Error("Missing assumptions");
  if (!data.conclusion || typeof data.conclusion !== "object") {
    throw new Error("Missing conclusion");
  }
  if (!data.fallacy || typeof data.fallacy !== "object") {
    throw new Error("Missing fallacy");
  }
  if (!Array.isArray(data.graph_nodes) || !Array.isArray(data.graph_edges)) {
    throw new Error("Missing graph data");
  }
  data.validity_score = Math.max(
    0,
    Math.min(100, Number(data.validity_score) || 0)
  );
  return data;
}

function validateExamData(data, testType, studentAnswer) {
  if (!data || typeof data !== "object") throw new Error("Invalid exam response");
  const stringFields = [
    "detected_question_type",
    "skill_tested",
    "correct_answer",
    "main_point_or_rule",
    "teaching_tip",
    "score_improvement_tip",
    "visual_reasoning_note",
  ];
  if (stringFields.some((field) => typeof data[field] !== "string")) {
    throw new Error("Missing exam fields");
  }
  if (!Array.isArray(data.step_by_step_solution) || !Array.isArray(data.option_analysis)) {
    throw new Error("Missing exam arrays");
  }
  if (!data.student_feedback || !data.similar_practice_question) {
    throw new Error("Missing exam details");
  }

  const correctAnswer = data.correct_answer.trim().toUpperCase();
  if (!VALID_ANSWERS.has(correctAnswer)) throw new Error("Invalid correct answer");

  const optionMap = new Map();
  data.option_analysis.forEach((item) => {
    const option = String(item?.option || "").trim().toUpperCase();
    if (VALID_ANSWERS.has(option) && typeof item.explanation === "string") {
      optionMap.set(option, {
        option,
        is_correct: option === correctAnswer,
        explanation: item.explanation,
      });
    }
  });
  if (optionMap.size !== 4) throw new Error("Incomplete option analysis");

  const practice = data.similar_practice_question;
  if (
    typeof practice.question !== "string" ||
    !practice.options ||
    !["A", "B", "C", "D"].every(
      (option) => typeof practice.options[option] === "string"
    ) ||
    !VALID_ANSWERS.has(String(practice.correct_answer).toUpperCase()) ||
    typeof practice.explanation !== "string"
  ) {
    throw new Error("Invalid practice question");
  }

  data.test_type = testType;
  data.correct_answer = correctAnswer;
  data.confidence = Math.max(0, Math.min(100, Number(data.confidence) || 0));
  data.option_analysis = ["A", "B", "C", "D"].map((option) =>
    optionMap.get(option)
  );

  const hasStudentAnswer = VALID_ANSWERS.has(studentAnswer);
  data.student_feedback.student_answer = hasStudentAnswer
    ? studentAnswer
    : "Not provided";
  data.student_feedback.is_student_correct = hasStudentAnswer
    ? studentAnswer === correctAnswer
    : null;
  if (!hasStudentAnswer) {
    data.student_feedback.message =
      "Choose an option next time to receive personalised feedback on your reasoning.";
    data.student_feedback.likely_mistake = "";
  }

  return data;
}

async function generateJson(ai, prompt, schema) {
  const result = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseJsonSchema: schema,
      temperature: 0.2,
    },
  });
  if (!result.text) throw new Error("Empty AI response");
  return JSON.parse(cleanGeminiResponse(result.text));
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Only POST requests are allowed." });
  }

  if (!process.env.GEMINI_API_KEY) {
    return response.status(500).json({
      error:
        "Gemini API key is missing on the server. Please add GEMINI_API_KEY in Vercel Environment Variables.",
    });
  }

  const body = request.body || {};
  const mode = body.mode === "exam" ? "exam" : "logic";
  const inputText = body.inputText ?? body.argumentText ?? "";

  if (typeof inputText !== "string" || !inputText.trim()) {
    return response.status(400).json({
      error: "Please enter a question or argument first.",
    });
  }
  if (inputText.length > MAX_INPUT_LENGTH) {
    return response.status(400).json({
      error: "This input is very long. Try shortening it for better analysis.",
    });
  }

  const testType = normalizeSelection(
    body.testType,
    TEST_TYPES,
    DEFAULT_TEST_TYPE
  );
  const questionType = normalizeSelection(
    body.questionType,
    QUESTION_TYPES,
    DEFAULT_QUESTION_TYPE
  );
  const studentAnswer = String(body.studentAnswer || "").trim().toUpperCase();

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    if (mode === "exam") {
      const data = await generateJson(
        ai,
        buildExamTutorPrompt(inputText, testType, questionType, studentAnswer),
        examSchema
      );
      return response
        .status(200)
        .json(validateExamData(data, testType, studentAnswer));
    }

    const data = await generateJson(ai, buildLogicPrompt(inputText), logicSchema);
    return response.status(200).json(validateLogicData(data));
  } catch (error) {
    const message = String(error?.message || "").toLowerCase();
    if (message.includes("429") || message.includes("rate") || message.includes("quota")) {
      return response.status(429).json({
        error: "Too many requests. Wait for a minute and try again.",
      });
    }
    if (
      error instanceof SyntaxError ||
      message.includes("invalid") ||
      message.includes("missing") ||
      message.includes("incomplete") ||
      message.includes("empty ai")
    ) {
      return response.status(502).json({
        error: "AI returned an unreadable response. Please try again.",
      });
    }
    return response.status(500).json({
      error: "Could not connect to Gemini. Please check your internet or API key.",
    });
  }
}
