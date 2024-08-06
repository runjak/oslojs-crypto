import { bench, expect, test } from "vitest";
import { sha256, SHA256 } from "./sha256.js";

test("SHA256", async () => {
	const randomValues = crypto.getRandomValues(new Uint8Array(5 * 100));
	for (let i = 0; i < randomValues.byteLength / 5; i++) {
		const expected = sha256(randomValues.slice(0, i * 5));
		const hash = new SHA256();
		for (let j = 0; j < i; j++) {
			hash.update(randomValues.slice(j * 5, (j + 1) * 5));
		}
		expect(hash.digest()).toStrictEqual(expected);
	}
});

test("sha256 behaves like SubtleCrypto digest", async () => {
	const randomValues = crypto.getRandomValues(new Uint8Array(5 * 100));
	for (let i = 0; i < randomValues.byteLength / 5; i++) {
		const example = randomValues.slice(0, i * 5);

		const expected = new Uint8Array(await crypto.subtle.digest("SHA-256", example));
		const actual = sha256(example);

		expect(actual).toStrictEqual(expected);
	}
});
