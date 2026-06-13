export const DEFAULT_TEST_TYPE = "Auto / General Thinking Skills";
export const DEFAULT_QUESTION_TYPE = "Auto Detect";
export const DEFAULT_DOMAIN = "Auto Detect";
export const DEFAULT_CATEGORY = "Auto Detect";

export const TEST_TYPES = [
  DEFAULT_TEST_TYPE,
  "NSW Selective Thinking Skills",
  "Opportunity Class Thinking Skills",
  "Year 5 Entry Thinking Skills",
  "Year 7 Selective Thinking Skills",
  "Cambridge Thinking Skills",
  "Essential Selective Thinking Skills",
  "Understanding OC Thinking Skills",
  "Understanding Selective Thinking Skills",
  "Math / Problem Solving for Selective",
];

export const DOMAIN_OPTIONS = [
  DEFAULT_DOMAIN,
  "Critical Reasoning",
  "Logical Reasoning",
  "Numerical Reasoning",
  "Data / Table / Graph Reasoning",
  "Abstract / Pattern Reasoning",
  "Spatial Reasoning",
];

const CATEGORY_DEFINITIONS = [
  {
    domain: "Critical Reasoning",
    category: "Main Conclusion & Support",
    keywords: ["main conclusion", "main point", "reason", "support", "conclusion"],
    strategy: "Separate the claim being proved from the reasons offered for it.",
    mistakes: "Selecting background information or an intermediate claim as the conclusion.",
    subskills: [
      "Identify the main conclusion",
      "Identify supporting reasons",
      "Distinguish evidence from background",
      "Find an intermediate conclusion",
    ],
  },
  {
    domain: "Critical Reasoning",
    category: "Strengthen / Best Support",
    keywords: ["strengthen", "best support", "most supports", "more likely"],
    strategy: "Find the conclusion, locate its weakest link, and choose the option that most directly makes the conclusion more likely.",
    mistakes: "Choosing a topic-related statement, repeating existing evidence, or confirming the problem without supporting the proposed conclusion.",
    subskills: [
      "Strengthen with new evidence",
      "Choose the best support",
      "Close a reasoning gap",
      "Distinguish direct from indirect support",
    ],
  },
  {
    domain: "Critical Reasoning",
    category: "Weaken / Assumptions",
    keywords: ["weaken", "assumption", "depends on", "required", "undermine"],
    strategy: "Identify the hidden bridge between evidence and conclusion, then test which option attacks or is required by that bridge.",
    mistakes: "Choosing an irrelevant negative fact or something helpful but not necessary.",
    subskills: [
      "Weaken an argument",
      "Identify a hidden assumption",
      "Apply the assumption negation test",
      "Find a counterexample",
    ],
  },
  {
    domain: "Critical Reasoning",
    category: "Evaluate Evidence & Flaws",
    keywords: ["flaw", "mistake", "evaluate", "reasoning correct", "evidence", "cannot conclude"],
    strategy: "Check the exact inference being made and ask whether the evidence rules out realistic alternatives.",
    mistakes: "Judging the topic or speaker instead of the logical link, or treating possible evidence as proof.",
    subskills: [
      "Evaluate evidence quality",
      "Identify an unsupported conclusion",
      "Detect correlation versus causation",
      "Detect overgeneralisation or ignored alternatives",
    ],
  },
  {
    domain: "Critical Reasoning",
    category: "Matching Arguments",
    keywords: ["same reasoning", "matching argument", "same structure", "parallel"],
    strategy: "Replace topic words with symbols and match the role and direction of every statement.",
    mistakes: "Matching vocabulary or subject matter while overlooking a different logical structure.",
    subskills: [
      "Abstract an argument structure",
      "Match conditional arguments",
      "Match causal arguments",
      "Distinguish similar topics from similar logic",
    ],
  },
  {
    domain: "Logical Reasoning",
    category: "Conditional Logic",
    keywords: ["if", "only if", "unless", "whenever", "condition", "requires"],
    strategy: "Write each rule in one direction, mark necessary and sufficient conditions, and use only valid chains or contrapositives.",
    mistakes: "Reversing a conditional, denying the antecedent, or misreading 'only if'.",
    subskills: [
      "Interpret if-then statements",
      "Interpret only-if and unless",
      "Use the contrapositive",
      "Build a conditional chain",
    ],
  },
  {
    domain: "Logical Reasoning",
    category: "Must / Cannot / Possibility",
    keywords: ["must be true", "cannot be true", "could be true", "possible", "impossible"],
    strategy: "For must claims test every allowed case; for could claims find one valid case; for cannot claims show contradiction.",
    mistakes: "Treating a likely or possible result as guaranteed.",
    subskills: [
      "Prove what must be true",
      "Find what cannot be true",
      "Construct a possible case",
      "Recognise insufficient information",
    ],
  },
  {
    domain: "Logical Reasoning",
    category: "Set & Quantifier Logic",
    keywords: ["all", "some", "none", "everyone", "no one", "venn", "overlap", "subset"],
    strategy: "Translate all, some, and none into set relationships without reversing subset direction or inventing members.",
    mistakes: "Confusing some with all, reversing a subset, or assuming two groups overlap.",
    subskills: [
      "Reason with all, some, and none",
      "Use subset and exclusion rules",
      "Reason about set overlap",
      "Count overlapping groups",
    ],
  },
  {
    domain: "Logical Reasoning",
    category: "Arrangement & Constraints",
    keywords: ["arrange", "seated", "row", "order", "ranking", "schedule", "next to", "between"],
    strategy: "List hard constraints, place fixed facts first, then build and test the smallest complete arrangement.",
    mistakes: "Assuming adjacency, overlooking circular rotation, or stopping after only one arrangement.",
    subskills: [
      "Order and rank items",
      "Solve row or circular seating",
      "Schedule under constraints",
      "Match people, objects, or locations",
    ],
  },
  {
    domain: "Logical Reasoning",
    category: "Truth, Lies & Rule Systems",
    keywords: ["truth", "lie", "statement", "exactly one", "at least one", "rule"],
    strategy: "Translate the truth-count rule precisely and test complete cases for consistency.",
    mistakes: "Confusing one with only one, or checking statements separately without checking the whole case.",
    subskills: [
      "Solve truth-and-lie statements",
      "Apply exactly-one and at-least-one rules",
      "Test consistency of rule systems",
      "Eliminate cases by contradiction",
    ],
  },
  {
    domain: "Numerical Reasoning",
    category: "Numerical Operations",
    keywords: ["ratio", "average", "percent", "total", "count", "money", "cost"],
    strategy: "Identify the requested quantity, organise values with units, calculate in short steps, and estimate-check the result.",
    mistakes: "Using the wrong base, averaging averages, losing units, or double-counting.",
    subskills: [
      "Solve ratios and proportions",
      "Calculate percentages and change",
      "Calculate averages and totals",
      "Count cases without duplication",
    ],
  },
  {
    domain: "Numerical Reasoning",
    category: "Rate, Time & Optimisation",
    keywords: ["speed", "rate", "time", "latest", "earliest", "cheapest", "maximum", "minimum"],
    strategy: "Build a timeline or cost table, include waiting and transition time, then compare complete feasible options.",
    mistakes: "Ignoring waiting time, comparing partial totals, or optimising the wrong quantity.",
    subskills: [
      "Solve rate and speed problems",
      "Reason with timetables",
      "Find earliest or latest times",
      "Find maximum, minimum, or cheapest solutions",
    ],
  },
  {
    domain: "Data / Table / Graph Reasoning",
    category: "Tables, Charts & Data",
    keywords: ["table", "chart", "graph", "axis", "data", "survey", "trend"],
    strategy: "Read titles, labels, units, scales, and legends before extracting only the values needed for the comparison.",
    mistakes: "Using the wrong row, scale, denominator, unit, or confusing a trend with an exact value.",
    subskills: [
      "Look up and compare table values",
      "Interpret charts and graph scales",
      "Infer trends from data",
      "Determine what data must imply",
    ],
  },
  {
    domain: "Abstract / Pattern Reasoning",
    category: "Patterns & Sequences",
    keywords: ["pattern", "sequence", "next", "symbol", "matrix", "odd one out"],
    strategy: "Compare one changing feature at a time, test the simplest consistent rule, and verify it across every position.",
    mistakes: "Using a rule that fits only one transition or changing multiple unexplained features.",
    subskills: [
      "Continue a number pattern",
      "Continue a symbol or shape sequence",
      "Solve a matrix pattern",
      "Find the odd one out by rule",
    ],
  },
  {
    domain: "Spatial Reasoning",
    category: "Spatial Transformations",
    keywords: ["cube", "net", "fold", "rotate", "reflect", "view", "shape", "diagram"],
    strategy: "Track invariant features, adjacency, orientation, and permitted rotations or reflections step by step.",
    mistakes: "Confusing rotation with reflection, inventing hidden faces, or claiming certainty without the diagram.",
    subskills: [
      "Fold or unfold cube nets",
      "Visualise 2D and 3D views",
      "Track rotations and reflections",
      "Reason from diagram-dependent spatial rules",
    ],
  },
];

export const CATEGORY_OPTIONS = [
  DEFAULT_CATEGORY,
  ...CATEGORY_DEFINITIONS.map((item) => item.category),
];

export const QUESTION_TYPES = [
  DEFAULT_QUESTION_TYPE,
  "Identifying Strengths",
  "Identifying Weaknesses",
  "Evaluating Reasoning",
  "Identifying Mistakes / Flaws",
  "Matching Arguments",
  "Conditional Logic / Must Be True",
  "Assumptions",
  "Venn / Set Logic",
  "Tables / Charts / Graphs",
  "Numerical Problem Solving",
  "Arrangement / Constraint Logic",
  "Visual / Spatial Reasoning",
  "General Problem Solving",
];

const LEGACY_CATEGORY_MAP = {
  "Identifying Strengths": "Strengthen / Best Support",
  "Identifying Weaknesses": "Weaken / Assumptions",
  "Evaluating Reasoning": "Evaluate Evidence & Flaws",
  "Identifying Mistakes / Flaws": "Evaluate Evidence & Flaws",
  "Matching Arguments": "Matching Arguments",
  "Conditional Logic / Must Be True": "Conditional Logic",
  Assumptions: "Weaken / Assumptions",
  "Venn / Set Logic": "Set & Quantifier Logic",
  "Tables / Charts / Graphs": "Tables, Charts & Data",
  "Numerical Problem Solving": "Numerical Operations",
  "Arrangement / Constraint Logic": "Arrangement & Constraints",
  "Visual / Spatial Reasoning": "Spatial Transformations",
};

const FEEDBACK_STYLE =
  "Name the student's exact reasoning move, explain why it fails or succeeds, and give one action they can use on the next question.";

export const TUTOR_PROFILES = CATEGORY_DEFINITIONS.flatMap((definition) =>
  definition.subskills.map((subskillName, index) => ({
    id: `${definition.domain.toLowerCase().replace(/[^a-z]+/g, "-")}-${definition.category.toLowerCase().replace(/[^a-z]+/g, "-")}-${index + 1}`,
    domain: definition.domain,
    category: definition.category,
    subskillName,
    whatItTests: `The student's ability to ${subskillName.toLowerCase()} accurately and efficiently.`,
    solvingStrategy: definition.strategy,
    commonMistakes: definition.mistakes,
    feedbackStyle: FEEDBACK_STYLE,
    practiceGenerationRule: `Create a new age-appropriate ${definition.category.toLowerCase()} MCQ focused on ${subskillName.toLowerCase()}, with one unambiguous answer and plausible distractors representing common mistakes.`,
    keywords: definition.keywords,
  }))
);

const SHARED_RULES = `
Accuracy rules:
- Use only facts stated in the question. Never add adjacency, exclusivity, equal scoring,
  existence, or "only" conditions that were not given.
- Treat "if A then B" as A -> B. The valid contrapositive is not-B -> not-A.
- Distinguish must, could, cannot, likely, and not enough information.
- If more than one answer is defensible, flag ambiguity and lower confidence.
- Explain every option and identify the misconception represented by a distractor.
- Generate only original practice questions with exactly one defensible answer.
- Teach in this order: short strategy, worked steps, option comparison, reflection, next task.
`;

function scoreProfile(profile, normalizedText) {
  return profile.keywords.reduce(
    (score, keyword) => score + (normalizedText.includes(keyword) ? 2 : 0),
    0
  );
}

export function getTutorGuidance({
  inputText,
  domain = DEFAULT_DOMAIN,
  category = DEFAULT_CATEGORY,
  questionType = DEFAULT_QUESTION_TYPE,
}) {
  const legacyCategory = LEGACY_CATEGORY_MAP[questionType];
  const requestedCategory =
    category !== DEFAULT_CATEGORY ? category : legacyCategory;

  let candidates = TUTOR_PROFILES.filter((profile) => {
    const domainMatches = domain === DEFAULT_DOMAIN || profile.domain === domain;
    const categoryMatches =
      !requestedCategory || profile.category === requestedCategory;
    return domainMatches && categoryMatches;
  });

  if (!candidates.length) candidates = TUTOR_PROFILES;

  const normalizedText = String(inputText || "").toLowerCase();
  candidates = candidates
    .map((profile) => ({
      profile,
      score: scoreProfile(profile, normalizedText),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, requestedCategory ? 4 : 8)
    .map(({ profile }) => profile);

  const candidateText = candidates
    .map(
      (profile) => `
- Domain: ${profile.domain}
  Category: ${profile.category}
  Subskill: ${profile.subskillName}
  What it tests: ${profile.whatItTests}
  Strategy: ${profile.solvingStrategy}
  Common mistakes: ${profile.commonMistakes}
  Feedback style: ${profile.feedbackStyle}
  Practice rule: ${profile.practiceGenerationRule}`
    )
    .join("\n");

  return `
Classify the question by its reasoning operation, not merely its topic.
Choose the closest domain, category, and subskill from these candidate tutor profiles:
${candidateText}

If none is a perfect fit, choose the closest category and describe a precise subskill
using the same non-proprietary taxonomy style.
${SHARED_RULES}
`;
}
