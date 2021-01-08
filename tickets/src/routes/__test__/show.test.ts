import request from 'supertest';
import { app } from '../../app';
import mongoose from "mongoose";
import { Ticket } from '../../models/tickets';

describe('Show tests', () => {
  it('returns a 404 if the ticket is not found', async () => {
    const id = mongoose.Types.ObjectId().toHexString()
    await request(app).get(`/api/tickets/${id}`).send().expect(404)
  });

  it('returns the ticket if the ticket is found', async () => {
    const title = 'concert'
    const price = 20

    await request(app).post('/api/tickets').set('Cookie', global.signin()).send({ title, price })
    const tickets = await Ticket.find({})
    const ticketResponse = await request(app).get(`/api/tickets/${tickets[0]._id}`).send().expect(200)

    expect(ticketResponse.body.title).toEqual(title)
    expect(ticketResponse.body.price).toEqual(price)
  });
})