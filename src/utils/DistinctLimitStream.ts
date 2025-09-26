// DistinctLimitStream.ts

import { Transform, TransformCallback } from "node:stream";

// To prevent excessive memory usage, we cap the size of the internal Set.
// This is a safeguard against unbounded memory growth in case of many unique items.
const MAX_SET_SIZE = 100_000;

/**
 * A Transform stream that filters out duplicate chunks
 * and limits the number of unique chunks passed through.
 */
class DistinctLimitStream extends Transform {
	private _seen: Set<string> = new Set<string>();
	private _count: number = 0;
	private _ended: boolean = false;

	constructor(private _limit: number) {
		super({ objectMode: true });
	}

	/**
	 * Get a unique key for a chunk.
	 */
	private _getKey(chunk: any): string {
		return typeof chunk === "object"
			? JSON.stringify(chunk)
			: chunk.toString();
	}

	/**
	 * Transform logic: passes only unique values until the limit is reached.
	 */
	_transform(
		chunk: any,
		_: BufferEncoding,
		callback: TransformCallback
	): void {
		if (this._ended) {
			// Ignore further chunks after ending
			return;
		}

		const key = this._getKey(chunk);

		if (!this._seen.has(key)) {
			if (this._seen.size >= MAX_SET_SIZE) {
				return callback(
					new Error("DistinctLimitStream: too many unique items")
				);
			}

			this._seen.add(key);
			this.push(chunk);

			this._count++;

			// Limit reached - end the stream
			if (this._count >= this._limit) {
				this._ended = true;
				this.push(null); // signal "end"
			}
		}

		callback();
	}
}

export { DistinctLimitStream };
