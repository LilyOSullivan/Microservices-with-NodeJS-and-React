import { Publisher } from "@lostickets/common";

export const natsWrapper = {
	client: {
		publish: jest
			.fn()
			.mockImplementation(
				(subject: string, data: string, callback: () => void) => {
					callback();
				}
			),
	},
};
