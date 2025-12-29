# AGENTS.md

This file contains instructions for agentic coding agents operating in this repository. It includes build/lint/test commands and code style guidelines to maintain consistency.

## Build Commands

- `npm run build`: Builds the Next.js application for production.
- `npm run dev`: Starts the development server.
- `npm run start`: Starts the production server.

## Lint Commands

- `npm run lint`: Runs Next.js built-in ESLint to check for code quality issues.

## Test Commands

This project does not currently have a test suite set up. To run tests (once added):

- No specific test runner configured yet. Recommend adding Jest or Vitest.
- For running a single test (future): `npm test -- --testNamePattern="test name"` (assuming Jest).

## Code Style Guidelines

### General

- **Language**: TypeScript for all code. No JavaScript files.
- **Semicolons**: Omit semicolons at the end of statements.
- **Quotes**: Use double quotes for strings.
- **Line Length**: No strict limit, but aim for readability (typically <100 characters).
- **Comments**: Use comments sparingly. Only for complex logic or non-obvious code. No JSDoc unless necessary.

### Imports

- Order imports as: external libraries, then internal (@/lib, @/components).
- Group by category with blank lines.
- Example:
  ```typescript
  import { useState } from "react";
  import { generateKey } from "@/lib/crypto";

  import Link from "next/link";
  ```

### Naming Conventions

- **Variables/Functions**: camelCase (e.g., `handleCreate`, `text`, `exportedKey`).
- **Components**: PascalCase (e.g., `Home`, `Header`).
- **Files**: camelCase for utility files (e.g., `crypto.ts`), PascalCase for components (e.g., `Header.tsx`).
- **Constants**: UPPER_SNAKE_CASE for magic numbers or config (rare in this codebase).
- **Types/Interfaces**: PascalCase (e.g., `CryptoKey`).

### Types

- Use TypeScript strictly. No `any` unless necessary (e.g., error handling).
- Explicitly type function parameters and return types where not inferred.
- Use interfaces for object shapes, unions for variants.
- Example:
  ```typescript
  interface EncryptedData {
    iv: string;
    data: string;
  }

  async function encryptText(plaintext: string, key: CryptoKey): Promise<EncryptedData> {
    // ...
  }
  ```

### Functions

- Prefer `function` declarations over arrow functions for top-level exports.
- Use arrow functions for inline callbacks or short utilities.
- Always use `async/await` over Promises directly.
- Example:
  ```typescript
  export async function generateKey() {
    return crypto.subtle.generateKey({ name: "AES-GCM", length: 256 }, true, ["encrypt", "decrypt"]);
  }

  const handleClick = () => {
    // short callback
  };
  ```

### Error Handling

- Use `try/catch` for async operations.
- Catch errors as `e: any` if needed for `.message`.
- Use `finally` for cleanup if necessary.
- Return error responses in API routes with appropriate status codes.
- Example:
  ```typescript
  try {
    const data = await someAsyncCall();
    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
  ```

### React Components

- Use functional components with hooks.
- Add `"use client"` directive for client-side components.
- Destructure props explicitly.
- Use `useState` for local state.
- Example:
  ```typescript
  "use client";
  import { useState } from "react";

  export default function MyComponent({ params }: { params: { id: string } }) {
    const [state, setState] = useState(initialValue);

    // ...
  }
  ```

### JSX

- Use Tailwind CSS for styling.
- Class names: Use utility classes, group logically.
- Avoid inline styles.
- Conditional rendering with ternary or logical AND.
- Example:
  ```jsx
  <button
    onClick={handleClick}
    className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-all disabled:opacity-50"
  >
    {loading ? "Loading..." : "Submit"}
  </button>
  ```

### API Routes

- Use Next.js App Router structure.
- Export named functions (GET, POST, etc.).
- Use `NextResponse` for responses.
- Validate inputs and handle errors gracefully.
- Example:
  ```typescript
  import { NextResponse } from "next/server";

  export async function POST(req: Request) {
    const body = await req.json();
    // process
    return NextResponse.json({ id });
  }
  ```

### Libraries and Dependencies

- Prefer lightweight libraries.
- Use Web Crypto API for crypto operations.
- Redis for storage (Upstash).
- Only add dependencies if necessary; this codebase is minimal.

### Security

- Never log sensitive data (keys, secrets).
- Encrypt data client-side.
- Use environment variables for secrets (.env.local).
- Validate and sanitize inputs.

### File Structure

- `/app`: Next.js app router pages and API routes.
- `/components`: Reusable React components.
- `/lib`: Utility functions and configurations.
- Keep files small and focused.

### Formatting

- Use Prettier if available (not configured, but recommend adding).
- Consistent indentation (2 spaces).
- Trim trailing whitespace.

### Best Practices

- Write self-documenting code.
- Avoid global state; use props and hooks.
- Test manually for now; add automated tests later.
- Follow Next.js best practices.
- Ensure accessibility (ARIA labels where needed, but minimal in this app).

## Additional Notes

- This is a security-focused app; prioritize zero-knowledge principles.
- No Cursor rules or Copilot instructions found in .cursor/rules/ or .github/copilot-instructions.md.
- Update this file as the codebase evolves (e.g., add test commands when tests are implemented).</content>
<parameter name="filePath">/home/hadow/Documents/wodah-burner/AGENTS.md