
const nats  = require('node-nats-streaming')

class NatsWrapper {
  _client;

  connect(clausterId, clientId, url){
    this._client = nats.connect(clausterId, 'asdfasdfad' , {url});

    return new Promise((resolve, reject) => {
      this._client.on('connect', () => {
        console.log('Connected NATS')
      });
      this._client.on('error', err => {
        reject(err)
      })
    })

  }

  publish(subject, data) {
    this._client.publish(subject, JSON.stringify(data), () => {
      console.log('Event Published');
    })
  }

}


module.exports = natsWrapper = new NatsWrapper()