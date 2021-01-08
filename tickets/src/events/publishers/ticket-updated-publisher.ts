import { Publisher, Subjects, TicketUpdatedEvent  } from "@lpiotrowski503tickets/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated
}