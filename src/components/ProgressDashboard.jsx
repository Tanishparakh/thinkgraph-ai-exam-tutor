import { summarizeProgress } from "../services/progressService";

function ProgressDashboard({ progress, onReset }) {
  const summary = summarizeProgress(progress);

  return (
    <section className="progress-card">
      <div className="card-header">
        <div>
          <h2>Your Learning Progress</h2>
          <p className="section-description">
            Stored only in this browser. Answer selections are required for tracking.
          </p>
        </div>
        <button
          className="text-button"
          onClick={onReset}
          disabled={!progress.totalAttempted}
        >
          Reset progress
        </button>
      </div>

      <div className="progress-summary-grid">
        <div><span>Attempted</span><strong>{progress.totalAttempted}</strong></div>
        <div><span>Correct</span><strong>{progress.correctAnswers}</strong></div>
        <div><span>Accuracy</span><strong>{summary.accuracy}%</strong></div>
        <div><span>Average Time</span><strong>{summary.averageSeconds}s</strong></div>
      </div>

      <div className="progress-insights">
        <div>
          <span>Weakest Category</span>
          <strong>{summary.weakestCategory}</strong>
        </div>
        <div>
          <span>Common Mistake</span>
          <strong>{summary.commonMistake}</strong>
        </div>
        <div>
          <span>Suggested Next Practice</span>
          <strong>
            {progress.latestRecommendation ||
              "Complete a question with an answer selected to receive a recommendation."}
          </strong>
        </div>
      </div>

      {summary.categoryRows.length > 0 && (
        <div className="category-progress">
          <h3>Category Performance</h3>
          {summary.categoryRows.map((item) => (
            <div className="category-progress-row" key={item.category}>
              <div>
                <strong>{item.category}</strong>
                <span>{item.correct}/{item.attempted} correct</span>
              </div>
              <div className="category-progress-track">
                <div style={{ width: `${item.accuracy}%` }} />
              </div>
              <strong>{item.accuracy}%</strong>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default ProgressDashboard;
