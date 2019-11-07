import express from 'express';
import cors from 'cors';
import router from 'server/routes';
import { serverSidePort as port, clientSidePort } from 'shared/constants/common';
import isDevelopment from 'server/utils/isDevelopment';

const app = express();

const corsOptions = {
    origin: isDevelopment ? `http://localhost:${clientSidePort}` : process.env.HOST_URL,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(express.json());

// app.use(express.static('dist'));

app.use('/', router);

app.listen(port, () => console.log(`Listening on port ${port}`));
