import { Publisher, Subjects, TicketUpdatedEvent } from "@lostickets/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
	subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
