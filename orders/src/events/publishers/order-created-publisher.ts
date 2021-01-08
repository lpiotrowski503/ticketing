import { Publisher, OrderCreatedEvent, Subjects } from '@lpiotrowski503tickets/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated
}