"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nat = void 0;
const node_nats_streaming_1 = __importDefault(require("node-nats-streaming"));
class Nats {
    connect(clusterId, clientId, url) {
        this._client = node_nats_streaming_1.default.connect(clusterId, clientId, { url });
        return new Promise((resolve, reject) => {
            this._client.on('connect', () => {
                console.log('Connected NATS');
            });
            this._client.on('error', err => {
                reject(err);
            });
        });
    }
    publish(subject, data) {
        return new Promise((resolve, reject) => {
            this._client.publish(subject, JSON.stringify(data), (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    console.log('Event Published for subject: ' + subject);
                    resolve({});
                }
            });
        });
    }
}
const nat = new Nats();
exports.nat = nat;
