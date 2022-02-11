import { Subjects, Publisher, OrderCancelledEvent } from "@lostickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
	subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
