// displayRandomNumbers.ts

import { pipeline } from "stream/promises";

import { RandomNumbersStream } from "./RandomNumbersStream.ts";
import { DistinctLimitStream } from "./DistinctLimitStream.ts";
import { DelimiterStream } from "./DelimiterStream.ts";
import { StdOutStream } from "./StdOutStream.ts";
import type { Params } from "./params.ts";

/**
 * Displays random numbers based on the provided parameters.
 *
 * @param params - The parameters for random number generation.
 * @returns A promise that resolves when the operation is complete.
 *
 * This function sets up a pipeline of streams to generate, filter, format, and output random numbers.
 * It uses:
 * - RandomNumbersStream to generate numbers
 * - DistinctLimitStream to ensure uniqueness and enforce the count limit
 * - DelimiterStream to format the output
 * - StdoutStream to print to the console
 *
 * Example usage:
 * ```ts
 * const params: Params = { amount: 5, min: 1, max: 10, delimiter: ", " };
 * await displayRandomNumbers(params);
 * ```
 */
export async function displayRandomNumbers(params: Params) {
	console.log("\nUsing parameters:", JSON.stringify(params, null, 2), "\n");

	await pipeline(
		new RandomNumbersStream(params.min, params.max),
		new DistinctLimitStream(params.amount),
		new DelimiterStream(params.delimiter),
		new StdOutStream()
	);

	process.stdout.write("\n");
}
