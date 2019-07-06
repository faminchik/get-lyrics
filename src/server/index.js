import express from 'express';
import cors from 'cors';
import router from './routes';
import { serverSidePort as port, clientSidePort } from '../shared/constants/common';

const app = express();

const corsOptions = {
    origin: `http://localhost:${clientSidePort}`,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(express.json());

// app.use(express.static('dist'));

app.use('/', router);

app.listen(port, () => console.log(`Listening on port ${port}`));
