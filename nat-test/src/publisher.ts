import nats from 'node-nats-streaming';
import { TicketCreatedPublisher } from './events/ticket-created-publisher';
console.clear();
// create client
const stan = nats.connect('ticketing', 'abc', {
  url:'http://localhost:4222'
});

stan.on('connect', async() => {
  console.log('Publisher Connected to NATS')
  
  const publisher = new TicketCreatedPublisher(stan);
  await publisher.publish({
    id:'test',
    title:'test',
    price:20
  })
})