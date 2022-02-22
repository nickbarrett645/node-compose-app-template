import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/userRoutes.js';
import session from 'express-session';
import redis from 'redis';
import connectredis from 'connect-redis';
import cors from 'cors';


let redisClient = redis.createClient({
    url:`${process.env.REDIS_URL}:${process.env.REDIS_PORT}`,
    legacyMode: true
});
redisClient.connect().catch(console.error)


let RedisStore = connectredis(session)

redisClient.on('error', (err) => console.log('Redis Client Error', err));


const app = express()
const port = process.env.PORT || 3000
const mongoURL =`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_IP}:${process.env.MONGO_PORT}/?authSource=admin`
mongoose.connect(mongoURL)
.then(() => console.log('Successfully connected to DB'))
.catch(err => console.log('Failed to connect to DB: ', err));

app.enable('trust proxy');
app.use(cors());

app.use(session({
    store: new RedisStore({client: redisClient}),
    secret: process.env.SESSION_SECRET,
    cookie: {
        secure: false,
        resave: false,
        saveUninitialized: false,
        httpOnly: true,
        maxAge: 3000000
    }
}));

app.use(express.json());


app.get('/api/v1/', (req, res) => {
  res.send('Hello World!!!!!!')
});

app.use('/api/v1/users', userRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

export default app
