import { Message } from 'node-nats-streaming';
import { TicketCreatedEvent } from '@lpiotrowski503tickets/common';
import { natsWrapper } from '../../../nats-wrapper';
import { TicketCreatedListener } from "../ticket-created-listener";
import mongoose from "mongoose";
import { Ticket } from '../../../models/ticket';

const setup = async () => {
  const listener = new TicketCreatedListener(natsWrapper.client)

  const data: TicketCreatedEvent['data'] = {
    version: 0,
    id: mongoose.Types.ObjectId().toHexString(),
    title: 'concert',
    price: 10,
    userId: mongoose.Types.ObjectId().toHexString()
  }

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn()
  }

  return { listener, data, msg }
}

describe('ticket created listener tests', () => {
  it('creates and saves a ticket', async () => {
    const { listener, data, msg } = await setup()

    await listener.onMessage(data, msg)

    const ticket = await Ticket.findById(data.id)

    expect(ticket).toBeDefined()
    expect(ticket!.title).toEqual(data.title)
    expect(ticket!.price).toEqual(data.price)
  });

  it('acks the message', async () => {
    const { listener, data, msg } = await setup()
    await listener.onMessage(data, msg)

    expect(msg.ack).toBeCalled()
  });
})