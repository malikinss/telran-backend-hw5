// RandomNumbersStream.ts

import { Readable } from "node:stream";

/** A Readable stream that generates random integers within a specified range. */
class RandomNumbersStream extends Readable {
	private _min: number;
	private _max: number;

	/**
	 * @param min - Minimum value (inclusive)
	 * @param max - Maximum value (inclusive)
	 */
	constructor(min: number, max: number) {
		super({ objectMode: true });
		this._min = min;
		this._max = max;
	}

	/** Generate a random integer within the [min, max] range */
	private _randomInt(): number {
		return (
			Math.floor(Math.random() * (this._max - this._min + 1)) + this._min
		);
	}

	/** Push random integers to the stream (infinite stream) */
	_read(): void {
		this.push(this._randomInt());
	}
}

// Export the RandomNumbersStream class
export { RandomNumbersStream };
