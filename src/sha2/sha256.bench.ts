import { bench, expect } from "vitest";
import { sha256 } from "./sha256.js";

const iterations = 10_000;

bench(
	"SHA256: Oslo",
	() => {
		const randomValues = crypto.getRandomValues(new Uint8Array(5));
		const hash = sha256(randomValues);

		expect(hash.length).toBe(32);
	},
	{ iterations }
);

bench(
	"SHA256: SubtleCrypto",
	async () => {
		const randomValues = crypto.getRandomValues(new Uint8Array(5));
		const hash = await crypto.subtle.digest("SHA-256", randomValues);

		expect(hash.byteLength).toBe(32);
	},
	{ iterations }
);
