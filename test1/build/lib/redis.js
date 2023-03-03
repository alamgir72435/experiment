"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = void 0;
const redis_1 = require("redis");
class Redis {
    constructor() {
        this._client = null;
        console.log('running Redis');
    }
    connect(uri) {
        // connect with redis
        const client = (0, redis_1.createClient)({ socket: { host: uri, port: 6379 } });
        client.connect().then(() => {
            this._client = client;
            console.log(`Redis Connected to ${uri}`);
        }).catch(err => {
            console.log(err);
        });
    }
    set() {
        this._client.SET('test', 'data');
    }
}
const redis = new Redis();
exports.redis = redis;
