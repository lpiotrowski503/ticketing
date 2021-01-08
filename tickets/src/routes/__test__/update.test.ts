import request from 'supertest';
import { app } from '../../app';
import mongoose from "mongoose";
import { Ticket } from '../../models/tickets';
import { natsWrapper } from '../../nats-wrapper';

describe('Update tests', () => {
  it('returns a 404 if the provided is does not exist', async () => {
    const id = mongoose.Types.ObjectId().toHexString()
    await request(app).put(`/api/tickets/${id}`)
      .set('Cookie', global.signin())
      .send({
        title: 'asdfgh',
        price: 20
      }).expect(404)
  });

  it('returns a 401 if the user is not authenticated', async () => {
    const id = mongoose.Types.ObjectId().toHexString()
    await request(app).put(`/api/tickets/${id}`)
      .send({
        title: 'asdfgh',
        price: 20
      }).expect(401)
  });

  it('returns a 401 if user does not own the ticket', async () => {
    const id = mongoose.Types.ObjectId().toHexString()
    const response = await request(app)
      .post('/api/tickets')
      .set('Cookie', global.signin(id))
      .send({
        title: 'asdfgh',
        price: 20
      }).expect(201)

    let ticket = (await Ticket.find({}))[0]

    await request(app).put(`/api/tickets/${ticket._id}`)
      .set('Cookie', global.signin())
      .send({
        title: 'asdfghjkl',
        price: 1000
      }).expect(401)
  });

  it('returns a 400 if the user provides an invalid title or price', async () => {
    const cookie = global.signin()
    const response = await request(app)
      .post('/api/tickets')
      .set('Cookie', cookie)
      .send({
        title: 'asdfgh',
        price: 20
      })

    let ticket = (await Ticket.find({}))[0]

    await request(app).put(`/api/tickets/${ticket._id}`)
      .set('Cookie', cookie)
      .send({
        title: '',
        price: 20
      }).expect(400)

    await request(app).put(`/api/tickets/${ticket._id}`)
      .set('Cookie', cookie)
      .send({
        title: 'asdfgh',
        price: -20
      }).expect(400)
  });

  it('updates the ticket provided valid inputs', async () => {
    const cookie = global.signin()
    const response = await request(app)
      .post('/api/tickets')
      .set('Cookie', cookie)
      .send({
        title: 'asdfgh',
        price: 20
      })

    let ticket = (await Ticket.find({}))[0]

    await request(app).put(`/api/tickets/${ticket._id}`)
      .set('Cookie', cookie)
      .send({
        title: 'asdfghjkl',
        price: 200
      }).expect(200)

    const ticketResponse = await request(app)
      .get(`/api/tickets/${ticket._id}`)
      .send()

    expect(ticketResponse.body.title).toEqual('asdfghjkl')
    expect(ticketResponse.body.price).toEqual(200)
  });

  it('publishes an event', async () => {
    const cookie = global.signin()
    const response = await request(app)
      .post('/api/tickets')
      .set('Cookie', cookie)
      .send({
        title: 'asdfgh',
        price: 20
      })

    let ticket = (await Ticket.find({}))[0]

    await request(app).put(`/api/tickets/${ticket._id}`)
      .set('Cookie', cookie)
      .send({
        title: 'asdfghjkl',
        price: 200
      }).expect(200)

    expect(natsWrapper.client.publish).toHaveBeenCalled()
  });

  it('reject updates if the ticket is reserved', async () => {
    const cookie = global.signin()
    const response = await request(app)
      .post('/api/tickets')
      .set('Cookie', cookie)
      .send({
        title: 'asdfgh',
        price: 20
      })

    let ticket = (await Ticket.find({}))[0]
    ticket.set({orderId: mongoose.Types.ObjectId().toHexString()})
    await ticket.save()

    await request(app).put(`/api/tickets/${ticket._id}`)
      .set('Cookie', cookie)
      .send({
        title: 'asdfghjkl',
        price: 200
      }).expect(400)
  });
})