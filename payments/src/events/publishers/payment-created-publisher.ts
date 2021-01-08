import {
  PaymentCreatedEvent,
  Publisher,
  Subjects,
} from '@lpiotrowski503tickets/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
