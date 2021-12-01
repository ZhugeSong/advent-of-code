import * as fs from "node:fs";
import * as readline from "node:readline";

(async function() {
	const reader = readline.createInterface({
		input: fs.createReadStream("./input.txt", { encoding: "utf-8" }),
		crlfDelay: Infinity,
	});

	let countOfIncreases = 0;

	let previous: number|undefined;
	for await (const line of reader) {
		const current = parseInt(line);
		if(previous && current > previous) {
			++countOfIncreases;
		}
		previous = current;
	}

	console.log(`Increases: ${countOfIncreases}`);
})();
