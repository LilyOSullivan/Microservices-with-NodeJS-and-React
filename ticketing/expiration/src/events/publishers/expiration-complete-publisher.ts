import {
	Subjects,
	Publisher,
	ExpirationCompleteEvent,
} from "@lostickets/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
	subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
