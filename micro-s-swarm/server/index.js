
// write express boilerplate
var express = require('express');
const morgan = require('morgan');
const { randomBytes } = require('crypto')
var app = express();
var port = process.env.PORT || 6000;

// take events
// const { TestEventPublisher } = require('./events/TestEventPublisher');
const { Publisher }  = require('@binarybunon/common')

// nats
const nats = require('./lib/NatsWrapper');

// dotenv
var dotenv = require('dotenv');
dotenv.config();

// morgan
app.use(morgan('dev'));


app.use(express.json());


app.get('/', function(req, res) {
  res.json({})
})

app.get('/process', async function(req, res) {

  // publish event
  nats.publish('test', {data:"test"})
  res.json({});
  
})




async function start(){
  try {
    console.clear();
    app.listen(port, function() {
      console.log('Listening on port : '+ port);
    });
    

    setTimeout(async() => {
      const natsUrl = process.env.PLATEFORM ==='local' ? 'http://localhost:4222' :'http://somity_nats-depl:4222';
      // get random number with randomBytes
      const randomNumber = randomBytes(10).toString('hex');
      await nats.connect('somity', randomNumber , natsUrl);
    }, 10000);

  } catch (error) {
    console.log(error)
  }
}

start();

// listen
