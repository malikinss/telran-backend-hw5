// DelimiterStream.ts

import { Transform, TransformCallback } from "node:stream";

/**
 * A Transform stream that adds a specified delimiter between chunks of data.
 *
 * @example
 * ```ts
 *   const delimiterStream = new DelimiterStream(", ");
 *   // input: [1, 2, 3]
 *   // output: "1, 2, 3"
 * ```
 */
class DelimiterStream<T = unknown> extends Transform {
	private isFirstChunk = true;

	constructor(private readonly delimiter: string) {
		super({ objectMode: true });
	}

	_transform(
		chunk: T,
		_: BufferEncoding,
		callback: TransformCallback
	): void {
		const output = this.isFirstChunk
			? String(chunk)
			: this.delimiter + String(chunk);

		this.push(output);
		this.isFirstChunk = false;
		callback();
	}
}

export { DelimiterStream };
