import { Listener } from "@binarybunon/common";

class TestEventListener extends Listener {
  subject = 'test';
  queueGroupName = 'test';
  onMessage(data, msg) {
    console.log('event Received: ' , data);
    msg.ack();
  }
}


export { TestEventListener }