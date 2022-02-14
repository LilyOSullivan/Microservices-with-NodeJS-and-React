import { TicketUpdatedListener } from "../ticket-updated-listener";
import { natsWrapper } from "../../../nats-wrapper";
import { Ticket } from "../../../models/ticket";
import mongoose from "mongoose";
import { TicketUpdatedEvent } from "@lostickets/common";
import { Message } from "node-nats-streaming";

const setup = async () => {
	const listener = new TicketUpdatedListener(natsWrapper.client);
	const ticket = Ticket.build({
		id: new mongoose.Types.ObjectId().toHexString(),
		title: "Star Wars",
		price: 20,
	});
	await ticket.save();
    
	const data: TicketUpdatedEvent["data"] = {
		id: ticket.id,
		version: ticket.version + 1,
		title: "Star Wars 2",
		price: 99,
		userId: "abcd",
	};

	// @ts-ignore
	const msg: Message = {
		ack: jest.fn(),
	};
	return { msg, data, ticket, listener };
};

it("finds, updates and saves a ticket", async () => {
	const { msg, data, ticket, listener } = await setup();
	await listener.onMessage(data, msg);
	const updatedTicket = await Ticket.findById(ticket.id);
	expect(updatedTicket!.title).toEqual(data.title);
	expect(updatedTicket!.price).toEqual(data.price);
	expect(updatedTicket!.version).toEqual(data.version);
});

it("acks the message", async () => {
	const { msg, data, listener } = await setup();
	await listener.onMessage(data, msg);
	expect(msg.ack).toHaveBeenCalled();
});

it("does not call ack if the event is out of order", async () => {
	const { msg, data, listener, ticket } = await setup();
	data.version = 10;
	try {
		await listener.onMessage(data, msg);
	} catch (err) {}
	expect(msg.ack).not.toHaveBeenCalled();
});
