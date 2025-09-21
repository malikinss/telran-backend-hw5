# Homework 5: Random Unique Numbers using Async Pipeline

## Task Definition

```
Displaying out random unique numbers using asynchronous pipeline (see CW #5)

Think of the following:

1. Structure of the modules
2. Where should be done getting params from the configuration
3. Where should be done validation
4. Single errors handling
5. Try to work out the simplest and reusable possible solution (Hint: using types parametrization)

```

## Description 📝

A TypeScript-based Node.js project that generates **random unique numbers** using an **asynchronous pipeline of streams**.  
The solution demonstrates modular design with separate responsibilities for:

-   Random number generation
-   Ensuring uniqueness and limiting results
-   Formatting with delimiters
-   Outputting to console

This approach leverages Node.js streams and async `pipeline` for composable, reusable data processing.

## Purpose 🎯

The main objectives of this project are:

-   Practice with **asynchronous pipelines** in Node.js
-   Explore stream **composition** with multiple transform stages
-   Implement parameter loading, validation, and error handling
-   Build a **flexible utility** for random number generation with configurable output

## Features ✨

-   ✅ Asynchronous stream pipeline using `stream/promises`
-   ✅ Configurable parameters: `amount`, `min`, `max`, and `delimiter`
-   ✅ Validation ensures correctness (e.g., `min < max`, range fits `amount`)
-   ✅ Supports unique random number generation
-   ✅ Modular design — each stream has a **single responsibility**
-   ✅ Graceful error handling with propagation to the caller

## How It Works 🔍

-   Parameters are loaded from a `config` file or fallback defaults
-   Validation ensures `amount`, `min`, `max`, and `delimiter` are valid
-   The **pipeline** is composed of:
    1. **RandomNumbersStream** → generates infinite random numbers
    2. **DistinctLimitStream** → filters duplicates and enforces count limit
    3. **DelimiterStream** → formats output with a custom delimiter
    4. **StdOutStream** → prints formatted numbers to console

Execution flow:

1. `main()` loads parameters via `loadParams()`
2. Calls `displayRandomNumbers(params)`
3. Runs pipeline asynchronously
4. On success → prints numbers to stdout
5. On error → rejects and logs the error

## Output 📜

Example console output:

```bash
Using parameters: {
  "amount": 7,
  "min": 1,
  "max": 49,
  "delimiter": ", "
}

23, 7, 15, 42, 3, 18, 36
```

## Usage 📦

```bash
git clone [repository URL]
cd [project folder]
npm install
ts-node index.ts
```

## Usage Examples 🚀

```typescript
import { displayRandomNumbers } from "./utils/displayRandomNumbers";
import { loadParams } from "./utils/params";

async function run() {
	const params = loadParams();
	await displayRandomNumbers(params);
}

run().catch((err) => console.error("Error:", err));
```

Or using streams manually:

```typescript
import { pipeline } from "stream/promises";
import { RandomNumbersStream } from "./utils/RandomNumbersStream";
import { DistinctLimitStream } from "./utils/DistinctLimitStream";
import { DelimiterStream } from "./utils/DelimiterStream";
import { StdOutStream } from "./utils/StdOutStream";

await pipeline(
	new RandomNumbersStream(1, 49),
	new DistinctLimitStream(7),
	new DelimiterStream("; "),
	new StdOutStream()
);
```

## Project Structure 🗂

-   **index.ts** – Entry point, loads params and runs async pipeline
-   **utils/displayRandomNumbers.ts** – Builds pipeline for random number generation
-   **utils/params.ts** – Config loading, defaults, validation
-   **utils/RandomNumbersStream.ts** – Generates random numbers
-   **utils/DistinctLimitStream.ts** – Ensures uniqueness & count limit
-   **utils/DelimiterStream.ts** – Adds delimiter between numbers
-   **utils/StdOutStream.ts** – Outputs to console
-   **config/** – Optional configuration files
-   **package.json** – Project metadata and dependencies
-   **tsconfig.json** – TypeScript compiler configuration

## Dependencies ✅

-   **TypeScript** 5.x
-   **Node.js** 18+
-   **config** – For external configuration
-   **stream/promises** – Async pipeline utilities (built-in)

## License 📄

MIT

## Conclusion 🧮

This project allowed me to:

-   Build a **streaming async pipeline** for data processing
-   Implement **validation and error handling** in a reusable way
-   Explore **modular design** for Node.js applications
-   Gain hands-on experience with **transform and writable streams**

---

Made with ❤️ and `TypeScript` by Sam-Shepsl Malikin
