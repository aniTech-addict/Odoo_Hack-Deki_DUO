import express from 'express';

//Config
import { PORT } from './config/env.js';
import cookieParser from 'cookie-parser';
import connectDb from './DB/connectDb.js';


const app = express();
await connectDb();

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
}); 



export default app;