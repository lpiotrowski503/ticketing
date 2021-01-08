import useReguest from '../../hooks/use-reguest';
import Router from 'next/router';

const TicketShow = ({ticket}) => {
  console.log(ticket);

  const { doRequest, errors } = useReguest({
    url: '/api/orders',
    method: 'post',
    body: { ticketId: ticket.id },
    onSuccess: (order) => {
      console.log(order);
      Router.push('/orders/[orderId]', `/orders/${order.id}`)
    }
  });

  return (
    <div>
      <h1>
        {ticket.title}
      </h1>
      <h4>
        Price: {ticket.price}
      </h4>
      {errors}
      <button onClick={() => doRequest()} className='btn btn-primary'>Purchase</button>
    </div>
  )
}

TicketShow.getInitialProps = async (context, client) => {
  const { ticketId } = context.query
  const { data: ticket } = await client.get(`/api/tickets/${ticketId}`)

  return { ticket };
};

export default TicketShow