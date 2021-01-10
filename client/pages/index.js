// import axios from 'axios';
// import { buildClient } from '../api/build-client';
import Link from 'next/link';

const LandingPage = ({ currentUser, tickets }) => {
  console.log(tickets);
  // return currentUser ? (
  //   <h1>You are signed in</h1>
  // ) : (
  //   <h1>You are NOT signed in</h1>
  // )

  const ticketList = tickets.map(ticket => {
    return (
      <tr key={ticket.id}>
        <td>{ticket.title}</td>
        <td>{ticket.price}</td>
        <td>
          <Link href='/tickets/[ticketId]' as={`/tickets/${ticket.id}`}>
            <a className="nav-link">View</a>
          </Link>
        </td>
      </tr>
    )
  })

  return (
    <div>
      <h1>
        Tickets 2
      </h1>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          { ticketList }
        </tbody>
      </table>
    </div>
  )
}

LandingPage.getInitialProps = async (context, client, currentUser) => {
  // return (await buildClient(context).get('/api/users/currentuser')).data;
  
  const { data: tickets } = await client.get('/api/tickets')
  return { tickets };
};

export default LandingPage;
