import * as fs from "node:fs";
import * as readline from "node:readline";

(async function() {
	const reader = readline.createInterface({
		input: fs.createReadStream("./input.txt", { encoding: "utf-8" }),
		crlfDelay: Infinity,
	});

	let countOfIncreases = 0;

	let previousSumOf3: number|undefined;
	let previous3: number[] = []
	for await (const line of reader) {
		process.stdout.write(`l${line} `);
		const current = parseInt(line);
		const length = previous3.push(current);
		if(length > 3) {
			previous3.shift();
		}
		const currSumOf3 = previous3.reduce((prev, curr) => prev+curr, 0);
		process.stdout.write(`${JSON.stringify(previous3)}=${currSumOf3}>${previousSumOf3}`)
		if(previous3.length === 3) {
			if(previousSumOf3 && previousSumOf3 < currSumOf3) {
				++countOfIncreases;
				process.stdout.write(` +`);
			}
			previousSumOf3 = currSumOf3;
		}
		process.stdout.write('\n');
	}

	console.log(`Increases: ${countOfIncreases}`);
})();
