import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError {
	statusCode = 400;
	reason = "Error connecting to the database";

	constructor(public message: string) {
		super(message);

		Object.setPrototypeOf(this, BadRequestError.prototype);
	}

	serializeErrors() {
		return [{ message: this.message }];
	}
}
