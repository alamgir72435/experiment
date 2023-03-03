"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("mongoose");
const morgan_1 = __importDefault(require("morgan"));
const crypto_1 = require("crypto");
// import Redis
const redis_1 = require("./lib/redis");
// nats
const NatsWrapper_1 = require("./lib/NatsWrapper");
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
// set morgan middleware
(0, morgan_1.default)('tiny');
console.log('Hi everyone iam test2 !');
app.get('/api/test2/index', (req, res) => {
    NatsWrapper_1.nat.publish('test', { name: 'test name' });
    res.send('Hello World');
});
// what should i do
// Connect Mongoose
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            (0, mongoose_1.set)('strictQuery', true);
            yield (0, mongoose_1.connect)(`mongodb://test1-mongo-srv:27017/test`, {});
            console.log('MongoDB Connected on Test2');
            // Connect Redis
            redis_1.redis.connect('test-redis-srv');
            // Nats Client 
            yield NatsWrapper_1.nat.connect('somity', (0, crypto_1.randomBytes)(10).toString('hex'), 'http://nats-srv:4222');
            app.listen(5000, () => {
                // server running
                console.log(`Server Running on http://localhost:5000 TEST2`);
            });
        }
        catch (error) {
            console.log(error);
            process.exit(1);
        }
    });
}
// start the function
start();
