import express from "express";
import { connect, set } from "mongoose"
import morgan from "morgan"

// import Redis
import { redis } from "./lib/redis";

// nats
import { nat } from "./lib/NatsWrapper"

const app = express();
// Middleware
app.use(express.json());

// set morgan middleware
morgan('tiny')

console.log('Hi everyone from test1 yea !')


app.get('/api/test1/index', (req, res) => {
  nat.publish('test', {name:'test name'})
  res.send('Hello World')
});
// what should i do

app.get("**", (req, res) => {
  res.send("Hello world Final")
})


// Connect Mongoose
async function start() {
  try {
    set('strictQuery', true)
    connect(`mongodb://test1-mongo-srv:27017/test`, {})
    .then(() => {
      console.log('MongoDB Connected on Test1');
    }).catch(err => {
      process.exit(1);
    })
    

    // Connect Redis
    redis.connect('test-redis-srv')

    // Nats Client 
    nat.connect('somity', 'test1', 'http://nats-srv:4222').then(() => {
      // 
    }).catch(err => {
      process.exit(1);
    })

    app.listen(5000, () => {
      // server running
      console.log(`Server Running on http://localhost:5000`);
    });

  } catch (error) {
    console.log("ERROR OCCURED", error);
    process.exit(1)
  }
}


// start the function
start();


