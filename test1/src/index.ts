import express from "express";
import { connect, set } from "mongoose"
import morgan from "morgan"

// import Redis
import { redis } from "./lib/redis";

const app = express();
// Middleware
app.use(express.json());

// set morgan middleware
morgan('tiny')

console.log('Hi everyone !')


app.get('/index', (req, res) => {

  res.send('Hello World')

})



// Connect Mongoose
async function start(){
  try {
  set('strictQuery', true)
   await connect(`mongodb://test1-mongo-srv:27017/test`, {});
   console.log('MongoDB Connected on Test1');

   // Connect Redis
   redis.connect('test-redis-srv')

   

   app.listen(5000, () => {
    // server running
    console.log(`Server Running on http://localhost:5000`);
  })
    
  } catch (error) {
    console.log(error);
    process.exit(1)
  }
}


// start the function
start();


