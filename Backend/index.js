import express from 'express';

//Config
import { PORT } from './config/env.js';
import cookieParser from 'cookie-parser';
import connectDb from './DB/connectDb.js';
import authRouter from './routes/auth.routes.js';
import maintenanceRouter from './routes/maintenance.routes.js';

const app = express();
await connectDb();

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth', authRouter);
app.use('/api/maintenance', maintenanceRouter);


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
}); 



export default app;