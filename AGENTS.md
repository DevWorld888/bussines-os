<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
# Agent Rules

## Project Context

This is a Next.js App Router SaaS dashboard called Business OS.

The goal is to build a business operating system for small local businesses such as painters, cleaners, tradies and agencies.

## Critical Rule

This version of Next.js may be newer than the model training data.

Before making architectural decisions, inspect:
- package.json
- next.config.ts
- src/app
- installed dependencies
- node_modules/next/dist/docs when needed

## Work Style

- Do not build the whole app at once.
- Work in small steps.
- Explain the plan before coding.
- Modify only the files required for the current task.
- Do not introduce unnecessary libraries.
- Keep files small and readable.
- Use TypeScript.
- Prefer Server Components unless interactivity is required.
- Use clean folder structure.

## UI Rules

- Follow DESIGN.MD.
- Use shadcn/ui when possible.
- Use Tailwind CSS.
- Keep UI minimal, clean and business-focused.
- Avoid random colors.
- Use the Refero style system defined in DESIGN.MD.

## After Every Change

Always report:
- files changed
- what was implemented
- how to test
- next recommended step