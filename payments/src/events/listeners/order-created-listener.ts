// import { TicketUpdatedPublisher } from './../publishers/ticket-updated-publisher';
import { Message } from 'node-nats-streaming';
import {
  Listener,
  OrderCreatedEvent,
  Subjects,
} from '@lpiotrowski503tickets/common';
import { queueGroupName } from './queue-group-name';
import { Order } from '../../models/order';
// import { Ticket } from '../../models/tickets';
// import { Error } from 'mongoose';
// import { natsWrapper } from '../../nats-wrapper';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    const order = Order.build({
      id: data.id,
      price: data.ticket.price,
      status: data.status,
      userId: data.userId,
      version: data.version,
    });

    await order.save();

    msg.ack();
  }
}
