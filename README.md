# ThinkGraph AI

ThinkGraph AI is a two-mode AI education tool:

- **Logic Map Mode** decomposes arguments into premises, assumptions, conclusions,
  fallacies, corrected reasoning, and a React Flow graph.
- **Exam Tutor Mode** solves Thinking Skills multiple-choice questions, explains
  every option, gives personalised feedback, suggests score improvements, and
  generates an original practice question.

## Requirements

- Node.js 20 or newer
- A Gemini API key

## Run locally

Install dependencies:

```bash
npm install
```

Create `.env.local` in the project root:

```text
GEMINI_API_KEY=your_key_here
```

Vite alone does not run the `/api/analyze` Vercel function. For the complete app,
install the Vercel CLI and use:

```bash
npx vercel dev
```

Open the local URL shown by Vercel. Use `npm run dev` only for frontend-only work.

## Checks

```bash
npm run lint
npm run build
```

## Deploy with GitHub and Vercel

1. Create an empty GitHub repository.
2. Commit this project and push the branch to GitHub.
3. In Vercel, choose **Add New Project** and import the GitHub repository.
4. Keep the detected Vite build settings.
5. Add `GEMINI_API_KEY` under **Project Settings > Environment Variables** for
   Production, Preview, and Development as needed.
6. Deploy, then redeploy after any environment-variable change.

The Gemini key is read only by `api/analyze.js`. Do not create a
`VITE_GEMINI_API_KEY` variable.

## Resource policy

The tutor guide contains generalized solving strategies and original-example
guidance. Source books, scanned PDFs, answer sheets, and copied exam questions are
not included in the repository or deployment.
