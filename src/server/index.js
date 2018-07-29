import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './routes';
import { port } from '../shared/constants/common';

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(express.static('dist'));

app.use('/', router);

app.listen(port, () => console.log(`Listening on port ${port}`));
