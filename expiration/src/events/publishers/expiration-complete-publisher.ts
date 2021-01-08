import {
  Publisher,
  ExpirationCompleteEvent,
  Subjects,
} from '@lpiotrowski503tickets/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
