export const DEFAULT_TEST_TYPE = "Auto / General Thinking Skills";
export const DEFAULT_QUESTION_TYPE = "Auto Detect";

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

const SHARED_RULES = `
Accuracy rules:
- Use only facts stated in the pasted question. Do not silently add adjacency, exclusivity,
  equal scoring, or "only" conditions.
- Treat "if A then B" as A -> B. Its valid contrapositive is not-B -> not-A.
  Do not reverse it to B -> A and do not assume not-A -> not-B.
- Distinguish must be true, could be true, cannot be true, and not enough information.
- If wording permits more than one answer, say the item appears ambiguous, lower confidence,
  and explain the competing interpretations instead of inventing a restriction.
- Check every option independently before selecting the best answer.
- Similar practice questions must be newly written and must have exactly one defensible answer.
`;

const PROFILES = {
  "Identifying Strengths": {
    strategy:
      "Find the main conclusion and its supporting reasons. Test each option by asking whether it makes the conclusion more likely or closes an important gap. Prefer an additional direct benefit over a fact that merely shows the problem still exists.",
    mistakes:
      "Choosing a merely related statement, repeating an existing reason, supporting background detail instead of the conclusion, or selecting evidence of poor performance that does not show the proposed activity will help.",
    explanation:
      "State the conclusion first, identify the reasoning gap, then compare how directly each option adds support. Calibration: if an argument says a student should continue drawing, evidence that creative skills benefit the student's future engineering goal directly strengthens it; a report saying the student is not studying hard enough does not show that drawing helps and may instead create a reason to stop.",
  },
  "Identifying Weaknesses": {
    strategy:
      "Find the conclusion and the assumption connecting the evidence to it. Prefer the option that most directly challenges that assumption or supplies a credible counterexample.",
    mistakes:
      "Choosing an unpleasant fact that does not affect the inference, attacking the topic rather than the reasoning, or selecting a weakly related exception.",
    explanation:
      "Name the assumption being challenged and describe exactly how the option makes the conclusion less secure.",
  },
  "Evaluating Reasoning": {
    strategy:
      "Translate each person's claim into explicit logical steps. Check whether each conclusion follows in every case allowed by the information.",
    mistakes:
      "Treating a possible result as guaranteed, assuming equal marks or hidden rules, and accepting a conclusion because it sounds reasonable.",
    explanation:
      "Evaluate each speaker separately, identify the valid or invalid inference, and use elimination only after the logic is checked.",
  },
  "Identifying Mistakes / Flaws": {
    strategy:
      "Locate the exact step where the conclusion stops following from the evidence. Check for reversed conditionals, unsupported assumptions, overlap errors, and confusion between possibility and certainty.",
    mistakes:
      "Pointing to a false-looking sentence that is not the reasoning error, or describing the topic rather than the logical flaw.",
    explanation:
      "Quote or paraphrase the faulty move, name the flaw in plain language, and show a counterexample when helpful.",
  },
  "Matching Arguments": {
    strategy:
      "Replace topic words with symbols and compare the role of each statement: condition, evidence, intermediate conclusion, and final conclusion.",
    mistakes:
      "Matching vocabulary or subject matter while ignoring a different logical structure or direction of implication.",
    explanation:
      "Display the abstract pattern of the original and each plausible match, then identify the structurally equivalent option.",
  },
  "Conditional Logic / Must Be True": {
    strategy:
      "Write each condition in one direction, link valid chains, use contrapositives carefully, and test must/cannot claims against all permitted cases.",
    mistakes:
      "Affirming the consequent, denying the antecedent, treating 'only if' backwards, or confusing a sufficient condition with a necessary one.",
    explanation:
      "Show the symbolic chain in student-friendly words and explain why alternatives are possible, impossible, or unsupported.",
  },
  Assumptions: {
    strategy:
      "Identify the unstated bridge required between the reasons and conclusion. Use the negation test: if denying an option seriously damages the argument, it is likely required.",
    mistakes:
      "Choosing something helpful but not necessary, selecting a restatement, or adding a stronger claim than the argument needs.",
    explanation:
      "State the gap, apply the negation test to the best option, and explain why other options are unnecessary.",
  },
  "Venn / Set Logic": {
    strategy:
      "Represent 'all' as a subset, 'no' as separated sets, and 'some' as at least one member. Do not assume a group exists unless the wording establishes it.",
    mistakes:
      "Reversing subset direction, assuming overlap from separate 'some' claims, or converting 'all A are B' into 'all B are A'.",
    explanation:
      "Describe the set relationships, place any known individual, and test each option against a possible diagram.",
  },
  "Tables / Charts / Graphs": {
    strategy:
      "Read titles, units, legends, axes, and row/column labels first. Extract only the needed values, calculate with units, and verify against the visual scale.",
    mistakes:
      "Using the wrong row or unit, confusing totals with rates, estimating when exact values are available, or overlooking a changing scale.",
    explanation:
      "List the key values, show the operation, include units, and note when missing image details prevent a reliable answer.",
  },
  "Numerical Problem Solving": {
    strategy:
      "Identify the target quantity, organize the known values, choose the shortest valid calculation, keep units consistent, and estimate to catch unreasonable answers.",
    mistakes:
      "Applying a percentage to the wrong base, averaging averages incorrectly, ignoring waiting/travel time, double-counting, or optimizing only one part of a total.",
    explanation:
      "Show compact numbered calculations and verify the result by substitution, estimation, or comparison.",
  },
  "Arrangement / Constraint Logic": {
    strategy:
      "List hard constraints, place fixed or most restrictive facts first, build a small table or sequence, and test options without assuming unstated adjacency.",
    mistakes:
      "Treating 'to the right of' as immediately right, forgetting rotations in circular arrangements, or failing to explore a second valid arrangement.",
    explanation:
      "Show the deductions in order and provide a valid arrangement or contradiction for each important option.",
  },
  "Visual / Spatial Reasoning": {
    strategy:
      "Describe invariant features such as adjacency, orientation, face relationships, counts, and allowed rotations/reflections. Use only diagram details included in text.",
    mistakes:
      "Confusing rotation with reflection, assuming hidden faces, or claiming certainty when the diagram is unavailable.",
    explanation:
      "Explain the visual transformation in words. If the image is absent or incomplete, lower confidence and clearly require manual checking.",
  },
  "General Problem Solving": {
    strategy:
      "Classify the task, separate relevant from irrelevant facts, model the constraints or calculation, and test each answer against the original question.",
    mistakes:
      "Starting calculations before identifying the target, adding unstated assumptions, or stopping after finding an option that merely seems plausible.",
    explanation:
      "State the model, solve in small verifiable steps, and finish with a direct option comparison.",
  },
};

const AUTO_DETECTION_GUIDE = `
Detect the closest category from this exact list:
Identifying Strengths; Identifying Weaknesses; Evaluating Reasoning;
Identifying Mistakes / Flaws; Matching Arguments; Conditional Logic / Must Be True;
Assumptions; Venn / Set Logic; Tables / Charts / Graphs; Numerical Problem Solving;
Arrangement / Constraint Logic; Visual / Spatial Reasoning; General Problem Solving.
Use the question's required reasoning operation, not just its topic.
`;

export function getTutorGuidance(questionType) {
  if (questionType === DEFAULT_QUESTION_TYPE || !PROFILES[questionType]) {
    return `${AUTO_DETECTION_GUIDE}\n${SHARED_RULES}`;
  }

  const profile = PROFILES[questionType];
  return `
Selected question type: ${questionType}
Strategy: ${profile.strategy}
Common mistakes: ${profile.mistakes}
Explanation pattern: ${profile.explanation}
${SHARED_RULES}
`;
}
