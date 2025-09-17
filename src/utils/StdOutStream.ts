// StdOutStream.ts

import { Writable } from "node:stream";

/**
 * Writable stream that outputs chunks to process.stdout.
 *
 * This stream operates in object mode and writes each incoming chunk
 * directly to standard output. At the end of the stream, it writes a newline.
 */
class StdOutStream extends Writable {
	/**
	 * Creates a new StdOutStream instance.
	 */
	constructor() {
		super({ objectMode: true });
	}

	/**
	 * Writes a chunk to stdout.
	 * @param chunk The chunk to write
	 * @param _ The encoding (ignored in object mode)
	 * @param callback Called when the chunk has been processed
	 */
	_write(
		chunk: unknown,
		_: BufferEncoding,
		callback: (error?: Error | null) => void
	): void {
		try {
			process.stdout.write(String(chunk));
			callback();
		} catch (err) {
			callback(err as Error);
		}
	}

	/**
	 * Called when the stream is ending. Writes a final newline.
	 * @param callback Called when final operation is complete
	 */
	_final(callback: (error?: Error | null) => void): void {
		process.stdout.write("\n", callback);
	}
}

export { StdOutStream };
