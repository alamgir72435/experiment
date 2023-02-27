import nats, { Message, Stan } from 'node-nats-streaming';
import { randomBytes } from 'crypto';
import { TicketCreatedListener } from "./events/ticket-created-listener"
console.clear();


// Listener Must have random Name to connect multiple listener
const randomName =  randomBytes(4).toString('hex');
const stan = nats.connect('ticketing',randomName, {
  url:'http://localhost:4222'
})

stan.on('connect', () => {
  console.log('Listener Connected to NATS');

  stan.on('close', () => {
    console.log('NATS Connection Closed!');
    process.exit();
  })


  new TicketCreatedListener(stan).listen()

})

process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());





