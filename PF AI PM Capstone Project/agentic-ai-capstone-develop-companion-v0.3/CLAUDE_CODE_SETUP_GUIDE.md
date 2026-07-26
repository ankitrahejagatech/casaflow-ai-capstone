# Claude Code Setup Guide

Follow these steps exactly. Total time: about ten minutes, once.

No terminal. No npm. No Node. If you see a terminal, you are in the wrong place.

## What You Need

1. **A paid Claude plan** (Pro or higher). Free claude.ai does not include Claude Code. Check current plans and pricing at claude.com before you commit.
2. **An Anthropic API key** for the prototype itself. The app you build calls the model live in your browser; that call bills to an API key, separately from your Claude plan. Create one at console.anthropic.com → API keys, and add a small amount of credit ($5 is plenty for this capstone). If your instructor has given different key instructions for your cohort, follow those.
3. **The Claude Desktop app** — download from claude.com/download and sign in with your paid account.

## Step 1: Download The Companion

Download the Develop companion ZIP from your course. Unzip it somewhere you can find again (Documents/capstone works).

## Step 2: Open The Code Tab

Open Claude Desktop. Find the **Code** tab. Open it.

## Step 3: Pick Your Folder

When Claude Code asks for a folder, choose the unzipped companion folder (the one containing `START_HERE.md`).

That is the whole setup. Claude Code can now read every file in the kit and write your `index.html` next to them.

## Step 4: Paste The Start Prompt

Open `STUDENT_START_PROMPT.md`. Copy the prompt. Paste it into Claude Code. It will read its instructions and ask for your PRD answers — that is Gate 0, prompt 00 in the playbook.

## Step 5: Your Key Goes In The App, Not The Chat

When prompt 03 builds the settings panel, paste your API key **into the app's settings field in the browser** — not into the chat, not into any file. The key lives in your browser's localStorage only. If you ever see your key written inside `index.html`, stop and tell the companion to remove it.

## Checking Your Work

Your prototype is `index.html` in the companion folder. To see it: double-click it (opens in your browser). After every playbook prompt: reload the browser tab, run the CHECK.

## Common Mistakes

- **Skipping the paid plan check.** The Code tab needs a paid plan. Confirm before demo week, not during.
- **No API credit.** The app runs on API credit. "No credit" errors mean console.anthropic.com → billing.
- **Opening the wrong folder.** Claude Code must be opened on the companion folder, or it cannot read the kit.
- **Doing Design here.** If you have no Design PRD answers yet, stop — go back to the Design companion first. Gate 0 will send you back anyway.
