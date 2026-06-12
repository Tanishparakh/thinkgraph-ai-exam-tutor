function ExamSolverPanel({ result }) {
  if (!result) {
    return (
      <div className="empty-state">
        <p>No solution yet.</p>
        <span>
          Paste a complete question with options A-D to receive a guided solution,
          option analysis, feedback, and a new practice question.
        </span>
      </div>
    );
  }

  const feedbackClass =
    result.student_feedback?.is_student_correct === true
      ? "success-panel"
      : result.student_feedback?.is_student_correct === false
        ? "warning-panel"
        : "info-panel";

  return (
    <div className="exam-result">
      <div className="exam-summary">
        <div className="answer-badge">
          <span>Correct Answer</span>
          <strong>{result.correct_answer}</strong>
        </div>
        <div className="confidence-card">
          <span>Confidence</span>
          <strong>{result.confidence}%</strong>
          <div className="confidence-track">
            <div style={{ width: `${result.confidence}%` }} />
          </div>
        </div>
      </div>

      <div className="result-meta">
        <div>
          <span>Question Type</span>
          <strong>{result.detected_question_type}</strong>
        </div>
        <div>
          <span>Test Type</span>
          <strong>{result.test_type}</strong>
        </div>
        <div>
          <span>Skill Tested</span>
          <strong>{result.skill_tested}</strong>
        </div>
      </div>

      <section className="result-section">
        <h3>Main Point / Rule</h3>
        <div className="highlight-box exam-rule-box">{result.main_point_or_rule}</div>
      </section>

      <section className="result-section">
        <h3>Step-by-Step Solution</h3>
        <ol className="solution-steps">
          {result.step_by_step_solution.map((step, index) => (
            <li key={`${index}-${step}`}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="result-section">
        <h3>Option Analysis</h3>
        <div className="option-grid">
          {result.option_analysis.map((item) => (
            <article
              className={item.is_correct ? "option-card correct" : "option-card"}
              key={item.option}
            >
              <div className="option-letter">{item.option}</div>
              <div>
                <strong>{item.is_correct ? "Correct" : "Not the best answer"}</strong>
                <p>{item.explanation}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={`feedback-card ${feedbackClass}`}>
        <h3>Student Feedback</h3>
        <p>
          <strong>Your answer:</strong> {result.student_feedback.student_answer}
        </p>
        <p>{result.student_feedback.message}</p>
        {result.student_feedback.likely_mistake && (
          <p>
            <strong>Likely mistake:</strong>{" "}
            {result.student_feedback.likely_mistake}
          </p>
        )}
      </section>

      <div className="tips-grid">
        <section className="tip-card teaching">
          <h3>Teaching Tip</h3>
          <p>{result.teaching_tip}</p>
        </section>
        <section className="tip-card improvement">
          <h3>Score Improvement Tip</h3>
          <p>{result.score_improvement_tip}</p>
        </section>
      </div>

      <section className="visual-note">
        <h3>Visual Reasoning Note</h3>
        <p>{result.visual_reasoning_note}</p>
      </section>

      <section className="practice-card">
        <span className="practice-label">Try This Next</span>
        <h3>Similar Practice Question</h3>
        <p>{result.similar_practice_question.question}</p>
        <div className="practice-options">
          {Object.entries(result.similar_practice_question.options).map(
            ([option, text]) => (
              <p key={option}>
                <strong>{option}.</strong> {text}
              </p>
            )
          )}
        </div>
        <details>
          <summary>Show answer and explanation</summary>
          <p>
            <strong>{result.similar_practice_question.correct_answer}.</strong>{" "}
            {result.similar_practice_question.explanation}
          </p>
        </details>
      </section>
    </div>
  );
}

export default ExamSolverPanel;
