import { useState } from "react";
import "./App.css";
import AnalysisPanel from "./components/AnalysisPanel";
import ExamSolverPanel from "./components/ExamSolverPanel";
import LogicGraph from "./components/LogicGraph";
import ModeSelector from "./components/ModeSelector";
import {
  QUESTION_TYPES,
  STUDENT_ANSWERS,
  TEST_TYPES,
} from "./data/examOptions";
import {
  analyzeArgument,
  solveExamQuestion,
} from "./services/geminiService";

const LOGIC_SAMPLE =
  "If a person is a doctor, then they studied medicine. Priya studied medicine. Therefore, Priya is a doctor.";

const EXAM_SAMPLE = `Aida says that Tom does not need to give up drawing because hobbies help keep people happy and relaxed, and this helps them study harder.

Which one of these statements, if true, most strengthens Aida's argument?

A. Artistic or creative skills are seen as important skills for engineers to have.
B. Tom's latest school report said that he was not studying hard enough.
C. Tom's school encourages its students to have at least one hobby.
D. Learning to draw well also often takes hard work and concentration.`;

function App() {
  const [mode, setMode] = useState("logic");

  const [logicText, setLogicText] = useState("");
  const [logicResult, setLogicResult] = useState(null);
  const [logicError, setLogicError] = useState("");
  const [logicLoading, setLogicLoading] = useState(false);

  const [examText, setExamText] = useState("");
  const [testType, setTestType] = useState(TEST_TYPES[0]);
  const [questionType, setQuestionType] = useState(QUESTION_TYPES[0]);
  const [studentAnswer, setStudentAnswer] = useState("");
  const [examResult, setExamResult] = useState(null);
  const [examError, setExamError] = useState("");
  const [examLoading, setExamLoading] = useState(false);

  const isLoading = logicLoading || examLoading;

  function loadLogicSample() {
    setLogicText(LOGIC_SAMPLE);
    setLogicError("");
    setLogicResult(null);
  }

  function loadExamSample() {
    setExamText(EXAM_SAMPLE);
    setQuestionType("Identifying Strengths");
    setExamError("");
    setExamResult(null);
  }

  async function analyzeLogic() {
    setLogicError("");
    setLogicResult(null);
    try {
      setLogicLoading(true);
      setLogicResult(await analyzeArgument(logicText));
    } catch (error) {
      setLogicError(error.message);
    } finally {
      setLogicLoading(false);
    }
  }

  async function solveExam() {
    setExamError("");
    setExamResult(null);
    try {
      setExamLoading(true);
      setExamResult(
        await solveExamQuestion({
          inputText: examText,
          testType,
          questionType,
          studentAnswer,
        })
      );
    } catch (error) {
      setExamError(error.message);
    } finally {
      setExamLoading(false);
    }
  }

  return (
    <div className="app">
      <header className="hero">
        <div className="badge">AI in Education MVP</div>
        <h1>ThinkGraph AI</h1>
        <p>AI Thinking Skills Tutor and Visual Logic Mapping Tool</p>
        <div className="hero-features">
          <span>Understand arguments</span>
          <span>Learn exam strategies</span>
          <span>Practise with feedback</span>
        </div>
      </header>

      <main className="page-shell">
        <ModeSelector mode={mode} onChange={setMode} disabled={isLoading} />

        {mode === "logic" ? (
          <div className="main-layout">
            <section className="input-card">
              <div className="card-header">
                <div>
                  <h2>Enter Logic Argument</h2>
                  <p className="section-description">
                    Paste a critical-thinking or logical argument below.
                  </p>
                </div>
                <span className="card-tag">Input</span>
              </div>

              <textarea
                value={logicText}
                onChange={(event) => setLogicText(event.target.value)}
                placeholder="Example: If A is true, then B is true. B is true. Therefore, A is true."
              />
              <div className="textarea-footer">
                <span>{logicText.length}/3000 characters</span>
                <span>Best results: short and clear arguments</span>
              </div>
              <div className="button-row">
                <button
                  className="secondary-button"
                  onClick={loadLogicSample}
                  disabled={logicLoading}
                >
                  Try Sample Argument
                </button>
                <button
                  className="primary-button"
                  onClick={analyzeLogic}
                  disabled={logicLoading}
                >
                  {logicLoading ? "Analyzing..." : "Analyze Argument"}
                </button>
              </div>
              {logicLoading && (
                <div className="message-box loading-message">
                  Analyzing argument...
                </div>
              )}
              {logicError && (
                <div className="message-box error-message">{logicError}</div>
              )}
            </section>

            <section className="analysis-card">
              <div className="card-header">
                <div>
                  <h2>Analysis Panel</h2>
                  <p className="section-description">
                    Premises, assumptions, conclusion, validity, and fallacy.
                  </p>
                </div>
                <span className="card-tag">Output</span>
              </div>
              {logicLoading ? (
                <div className="empty-state">
                  <p>Analyzing argument...</p>
                  <span>Gemini is extracting the logical structure.</span>
                </div>
              ) : (
                <AnalysisPanel analysis={logicResult} />
              )}
            </section>

            <section className="graph-card">
              <div className="card-header">
                <div>
                  <h2>Visual Logic Graph</h2>
                  <p className="section-description">
                    See how premises and assumptions connect to the conclusion.
                  </p>
                </div>
                <span className="card-tag">Graph</span>
              </div>
              <LogicGraph analysis={logicResult} />
              <div className="legend">
                <span><b className="dot premise-dot" /> Premise</span>
                <span><b className="dot assumption-dot" /> Assumption</span>
                <span><b className="dot conclusion-dot" /> Conclusion</span>
                <span><b className="dot fallacy-dot" /> Fallacy</span>
              </div>
            </section>
          </div>
        ) : (
          <div className="exam-layout">
            <section className="input-card exam-input-card">
              <div className="card-header">
                <div>
                  <h2>Exam Question</h2>
                  <p className="section-description">
                    Choose the context, then paste one complete MCQ with options A-D.
                  </p>
                </div>
                <span className="card-tag">Tutor Setup</span>
              </div>

              <div className="form-grid">
                <label>
                  <span>Test Type</span>
                  <select
                    value={testType}
                    onChange={(event) => setTestType(event.target.value)}
                    disabled={examLoading}
                  >
                    {TEST_TYPES.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </label>
                <label>
                  <span>Question Type</span>
                  <select
                    value={questionType}
                    onChange={(event) => setQuestionType(event.target.value)}
                    disabled={examLoading}
                  >
                    {QUESTION_TYPES.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </label>
                <label>
                  <span>Your Answer</span>
                  <select
                    value={studentAnswer}
                    onChange={(event) => setStudentAnswer(event.target.value)}
                    disabled={examLoading}
                  >
                    {STUDENT_ANSWERS.map((item) => (
                      <option value={item.value} key={item.label}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="question-label" htmlFor="exam-question">
                Question and options
              </label>
              <textarea
                id="exam-question"
                className="exam-textarea"
                value={examText}
                onChange={(event) => setExamText(event.target.value)}
                placeholder={"Paste the full question here...\n\nA. First option\nB. Second option\nC. Third option\nD. Fourth option"}
              />
              <div className="textarea-footer">
                <span>{examText.length}/3000 characters</span>
                <span>Text-described visual questions are supported</span>
              </div>
              <div className="button-row">
                <button
                  className="secondary-button"
                  onClick={loadExamSample}
                  disabled={examLoading}
                >
                  Try Sample Exam Question
                </button>
                <button
                  className="primary-button"
                  onClick={solveExam}
                  disabled={examLoading}
                >
                  {examLoading ? "Solving question..." : "Solve Question"}
                </button>
              </div>
              {examLoading && (
                <div className="message-box loading-message">
                  Solving question...
                </div>
              )}
              {examError && (
                <div className="message-box error-message">{examError}</div>
              )}
            </section>

            <section className="exam-output-card">
              <div className="card-header">
                <div>
                  <h2>Guided Solution</h2>
                  <p className="section-description">
                    Learn the method, review every option, and practise again.
                  </p>
                </div>
                <span className="card-tag">Tutor Output</span>
              </div>
              {examLoading ? (
                <div className="empty-state">
                  <p>Solving question...</p>
                  <span>
                    The tutor is checking the reasoning and preparing feedback.
                  </span>
                </div>
              ) : (
                <ExamSolverPanel result={examResult} />
              )}
            </section>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
