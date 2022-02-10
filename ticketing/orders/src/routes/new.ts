import mongoose from "mongoose";
import express, { Request, Response } from "express";
import {
	BadRequestError,
	NotFoundError,
	OrderStatus,
	requireAuth,
	validateRequest,
} from "@lostickets/common";
import { body } from "express-validator";
import { Ticket } from "../models/ticket";
import { Order } from "../models/order";

const router = express.Router();

const EXPIRATION_SECONDS = 15 * 60;

router.post(
	"/api/orders",
	requireAuth,
	[
		body("ticketId")
			.not()
			.isEmail()
			.custom((input: string) => mongoose.Types.ObjectId.isValid(input))
			.withMessage("TicketId must be provided"),
	],
	validateRequest,
	async (req: Request, res: Response) => {
		const { ticketId } = req.body;
		const ticket = await Ticket.findById(ticketId);
		if (!ticket) {
			throw new NotFoundError();
		}

		const isReserved = await ticket.isReserved();
		if (isReserved) {
			throw new BadRequestError("Ticket is already reserved");
		}

		const expiration = new Date();
		expiration.setSeconds(expiration.getSeconds() + EXPIRATION_SECONDS);

		const order = Order.build({
			userId: req.currentUser!.id,
			status: OrderStatus.Created,
			expiresAt: expiration,
			ticket,
		});

		await order.save();

		res.status(201).send(order);
	}
);

export { router as newOrderRouter };
