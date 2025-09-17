// params.ts
import config from "config";

/**
 * Parameters for random number generation.
 *
 * amount: number of random numbers to generate
 * min: minimum value (inclusive)
 * max: maximum value (inclusive)
 * delimiter: string to separate the numbers in output
 */
export interface Params {
	amount: number;
	min: number;
	max: number;
	delimiter: string;
}

/** Default parameters used if no config is provided. */
const defaultParams: Params = {
	amount: 7,
	min: 1,
	max: 49,
	delimiter: ",",
};

/**
 * Retrieves a parameter from config or falls back to a default value.
 *
 * @template T - The key type from Params interface
 * @param {T} key - The parameter name to retrieve
 * @param {Params[T]} fallback - The fallback value if the key is not in config
 * @returns {Params[T]} - The resolved parameter value
 */
function getParam<T extends keyof Params>(
	key: T,
	fallback: Params[T]
): Params[T] {
	if (!config.has(key)) return fallback;

	const value = config.get(key);

	if (typeof fallback === "number") return Number(value) as Params[T];
	if (typeof fallback === "string") return String(value) as Params[T];

	return value as Params[T];
}

/**
 * Validates the parameters to ensure they meet required constraints.
 *
 * @param {Params} params - The parameters to validate
 * @throws Will throw an error if any parameter is invalid
 */
function validateParams({ amount, min, max, delimiter }: Params): void {
	if (amount <= 0) throw new Error("Amount must be greater than 0.");
	if (min >= max) throw new Error("Min must be less than Max.");
	if (amount > max - min + 1)
		throw new Error("Amount exceeds the range for unique numbers.");
	if (!delimiter || delimiter.length === 0)
		throw new Error("Delimiter cannot be empty.");
}

/**
 * Loads parameters from configuration or defaults, then validates them.
 *
 * @returns {Params} - The final parameters to use for random number generation
 */
export function loadParams(): Params {
	const params: Params = {
		amount: getParam("amount", defaultParams.amount),
		min: getParam("min", defaultParams.min),
		max: getParam("max", defaultParams.max),
		delimiter: getParam("delimiter", defaultParams.delimiter),
	};

	validateParams(params);
	return params;
}
