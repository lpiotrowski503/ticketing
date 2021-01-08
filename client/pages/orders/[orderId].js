import { useEffect, useState } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import useReguest from '../../hooks/use-reguest';
import Router from 'next/router';

const OrderShow = ({order, currentUser}) => {
  console.log('order', order);
  console.log('currentUser', currentUser);
  const [ timeLeft, setTimeLeft ] = useState('')

  const { doRequest, errors } = useReguest({
    url: '/api/payments',
    method: 'post',
    body: { orderId: order.id },
    onSuccess: (payment) => Router.push('/orders')
  });
  
  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date()
      setTimeLeft(Math.round(msLeft / 1000))
    }

    findTimeLeft()
    const timerId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timerId)
    }
  }, [order])

  if (timeLeft < 0) {
    return (
      <div>Order expired</div>
    )
  }

  return (
    <div>
      Time left to pay: {timeLeft} secends
      <StripeCheckout 
      token={({ id }) => doRequest({token: id})}
      stripeKey='pk_test_51I3f7dKVBYr62dK26EKfN8SsQa7eCYRRQIIDxYvGogx9jJn0MfIzyqYCs4WKquyoNv1SvgumrorYeH25THwWhkoM00feAXiEJ6'
      amount={order.ticket.price * 100}
      email={currentUser.email}
      />
      {errors}
      </div>
  )
}

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query
  const { data: order } = await client.get(`/api/orders/${orderId}`)

  return { order };
};

export default OrderShow