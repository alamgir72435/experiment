import { Listener } from "@binarybunon/common";
import { Message } from "node-nats-streaming";

export class TestEventListener extends Listener{
  queueGroupName = 'test';
  queueId = 'test';
  subject = 'test';

  onMessage(data: any, msg: Message): void {
    console.log('data received', msg.getData())
    msg.ack();
  }
}