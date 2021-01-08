import { Publisher, Subjects, OrderCancelledEvent } from '@lpiotrowski503tickets/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled
}