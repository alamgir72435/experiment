
// write express boilerplate
import express from "express"
import {  randomBytes } from "crypto";
import dotenv from 'dotenv';
var app = express();
var port = process.env.PORT || 6001;

// dotenv
dotenv.config();


import nats from 'node-nats-streaming';
import { TestEventListener } from "./events/TestEventListener.js";
console.clear();



// Listener Must have random Name to connect multiple listener
function StartNats(){




  const randomName =  randomBytes(4).toString('hex');
  const stan = nats.connect('somity',randomName, {
    url: process.env.PLATEFORM ==='local'? 'http://localhost:4222' :'http://somity_nats-depl:4222'
  })

  stan.on('connect', () => {
    console.log('Listener Connected to NATS');

    stan.on('close', () => {
      console.log('NATS Connection Closed!');
      process.exit();
    });

    new TestEventListener(stan).listen()

  })

  process.on('SIGINT', () => stan.close());
  process.on('SIGTERM', () => stan.close());


}







async function start(){
  try {
    app.listen(port, function() {
      console.log('Listening on port : '+ port);
    });

    setTimeout(() => {
      StartNats()
    }, 10000);

    // const natsUrl = process.env.PLATEFORM ==='local' ? 'http://localhost:4222' :'http://localhost:4222';
    // // get random number with randomBytes
    // const randomNumber = randomBytes(10).toString('hex')
    // await nats.connect('somity', randomNumber , natsUrl)
  } catch (error) {
    console.log(error)
  }
}

start();