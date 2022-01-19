import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
	statusCode = 503;
	reason = "Error connecting to the database";

	constructor() {
		super("Error connecting to db");

		Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
	}

	serializeErrors() {
		return [{ message: this.reason }];
	}
}
