# AI Quiz App

A React + TypeScript practice project focused on building an interactive quiz experience with AI-generated content, client-side routing, local persistence, and a polished UI.

This project is not meant to be a production SaaS app. It is a portfolio piece that shows how I work with modern frontend tools, state management, async flows, and reusable UI patterns.

## What This App Does

- Generates quizzes from a topic, language, difficulty, and question count
- Lets users browse seeded quizzes and quizzes they created locally
- Runs quiz attempts with progress tracking and answer selection
- Saves quiz history and results in `localStorage`
- Shows a detailed result screen with answer review

## What I Practiced

- Building a multi-page React app with `react-router-dom`
- Writing the app in TypeScript with typed quiz data
- Managing session state with Zustand
- Handling async API flows and loading states
- Persisting user-generated data in the browser
- Structuring reusable components and page-level views
- Styling a custom interface without relying on a component library

## Tech Stack

- React
- TypeScript
- Vite
- React Router
- Zustand
- Groq SDK
- CSS

## Project Structure

```text
src/
  components/   Reusable UI like the header, modal, and quiz form
  hooks/        Custom hooks for quiz generation flows
  pages/        Route-level screens
  store/        Zustand session store
  utils/        API and shared data utilities
public/
  quizzes.json  Seed quiz data used by the app
```

## Running Locally

```bash
npm install
npm run dev
```

Open the local Vite URL shown in the terminal.

## Environment Variables

To enable AI quiz generation, create a `.env` file in the project root:

```bash
VITE_GROQ_API_KEY=your_api_key_here
```

Without this variable, the seeded quizzes and locally saved quizzes still work, but AI generation will not.

## Available Scripts

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Important Notes

- Authentication in this version is demo-only and stored locally in the browser
- Quiz data and attempt history are stored in `localStorage`
- The AI request is currently made from the client for learning purposes
- This repo is aimed at showing frontend practice, not production architecture

