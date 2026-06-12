function ModeSelector({ mode, onChange, disabled }) {
  return (
    <div className="mode-selector" aria-label="Choose tutor mode">
      <button
        className={mode === "logic" ? "mode-button active" : "mode-button"}
        onClick={() => onChange("logic")}
        disabled={disabled}
      >
        <strong>Logic Map Mode</strong>
        <span>Map arguments and detect fallacies</span>
      </button>
      <button
        className={mode === "exam" ? "mode-button active" : "mode-button"}
        onClick={() => onChange("exam")}
        disabled={disabled}
      >
        <strong>Exam Tutor Mode</strong>
        <span>Solve MCQs and improve your score</span>
      </button>
    </div>
  );
}

export default ModeSelector;
