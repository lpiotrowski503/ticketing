import { Publisher, Subjects, TicketCreatedEvent } from "@lpiotrowski503tickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated
}