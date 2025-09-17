// index.ts

import { displayRandomNumbers } from ".//utils/displayRandomNumbers.ts";
import { loadParams } from "./utils/params.ts";

async function main() {
	const params = loadParams();
	await displayRandomNumbers(params);
}

main().catch((err) => {
	console.error(err);
});
