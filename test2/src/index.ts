import express from "express";
import { connect, set } from "mongoose"
import morgan from "morgan"
import { randomBytes } from "crypto"

// Import Events
import { TestEventListener  } from "./events/TestEventListener"


import  nats, { Message, Stan } from 'node-nats-streaming'

// Connect nats client
const client = nats.connect('somity', randomBytes(10).toString('hex'), { url:'http://nats-srv:4222' });

client.on('connect', () => {
  console.log('NATS Connected for Listen EVENT');
  // Subscribe to Events
  new TestEventListener(client).listen();

})

client.on('error', () => {
  process.exit(1);
})





const app = express();
// Middleware
app.use(express.json());

// set morgan middleware
morgan('tiny')


app.get('/api/test2/index', (req, res) => {
  // nat.publish('test', {name:'test name'})
  res.send('Hello World from Test 2')
});

// what should i do


// Connect Mongoose
async function start() {
  try {
    set('strictQuery', true)
    await connect(`mongodb://test1-mongo-srv:27017/test`, {});
    console.log('MongoDB Connected on Test2');


    // Nats Client 
    // await nat.connect('somity', randomBytes(10).toString('hex'), 'http://nats-srv:4222')

    app.listen(5000, () => {
      // server running
      console.log(`Server Running on http://localhost:5000 TEST2`);
    })

  } catch (error) {
    console.log(error);
    process.exit(1)
  }
}


// start the function
start();


