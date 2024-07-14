import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
import dotenv from 'dotenv';
import orderRouter from './routers/orderRouter.js';
import bodyParser from 'body-parser'; // Import body-parser

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const connection_url = process.env.MONGO_URL;

mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Use body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);

app.get('/', (req, res) => res.status(200).send('Amazon Clone'));

// Listening to  server
app.listen(port, () => console.log(`Listening on local host:${port}`));
