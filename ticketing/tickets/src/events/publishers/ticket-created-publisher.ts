import { Publisher, Subjects, TicketCreatedEvent } from "@lostickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
	subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
