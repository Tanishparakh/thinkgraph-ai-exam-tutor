const STORAGE_KEY = "thinkgraph-exam-progress-v1";

export const EMPTY_PROGRESS = {
  totalAttempted: 0,
  correctAnswers: 0,
  totalSeconds: 0,
  categories: {},
  mistakes: {},
  latestRecommendation: "",
};

export function loadProgress() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return stored && typeof stored === "object"
      ? { ...EMPTY_PROGRESS, ...stored }
      : EMPTY_PROGRESS;
  } catch {
    return EMPTY_PROGRESS;
  }
}

export function recordAttempt(progress, result, elapsedSeconds) {
  if (result.student_feedback?.is_student_correct === null) return progress;

  const category = result.category || "Unclassified";
  const mistake =
    result.student_feedback.is_student_correct === true
      ? "Correct strategy"
      : result.mistake_type || "Unclassified mistake";
  const currentCategory = progress.categories[category] || {
    attempted: 0,
    correct: 0,
    totalSeconds: 0,
  };

  const next = {
    ...progress,
    totalAttempted: progress.totalAttempted + 1,
    correctAnswers:
      progress.correctAnswers +
      (result.student_feedback.is_student_correct ? 1 : 0),
    totalSeconds: progress.totalSeconds + Math.max(0, elapsedSeconds || 0),
    categories: {
      ...progress.categories,
      [category]: {
        attempted: currentCategory.attempted + 1,
        correct:
          currentCategory.correct +
          (result.student_feedback.is_student_correct ? 1 : 0),
        totalSeconds:
          currentCategory.totalSeconds + Math.max(0, elapsedSeconds || 0),
      },
    },
    mistakes: {
      ...progress.mistakes,
      [mistake]: (progress.mistakes[mistake] || 0) + 1,
    },
    latestRecommendation: result.next_practice_recommendation || "",
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}

export function clearProgress() {
  localStorage.removeItem(STORAGE_KEY);
  return EMPTY_PROGRESS;
}

export function summarizeProgress(progress) {
  const accuracy = progress.totalAttempted
    ? Math.round((progress.correctAnswers / progress.totalAttempted) * 100)
    : 0;
  const averageSeconds = progress.totalAttempted
    ? Math.round(progress.totalSeconds / progress.totalAttempted)
    : 0;

  const categoryRows = Object.entries(progress.categories).map(
    ([category, stats]) => ({
      category,
      ...stats,
      accuracy: stats.attempted
        ? Math.round((stats.correct / stats.attempted) * 100)
        : 0,
    })
  );
  const weakestCategory = categoryRows
    .filter((item) => item.attempted > 0)
    .sort((a, b) => a.accuracy - b.accuracy || b.attempted - a.attempted)[0];
  const commonMistake = Object.entries(progress.mistakes)
    .filter(([mistake]) => mistake !== "Correct strategy")
    .sort((a, b) => b[1] - a[1])[0];

  return {
    accuracy,
    averageSeconds,
    categoryRows: categoryRows.sort((a, b) => b.attempted - a.attempted),
    weakestCategory: weakestCategory?.category || "Not enough attempts yet",
    commonMistake: commonMistake?.[0] || "Not enough attempts yet",
  };
}
