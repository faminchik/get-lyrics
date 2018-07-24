const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const setTags = require('./helpers/setTags');
const { SUCCESS, ERROR } = require('../shared/constants/responseStatus');
const { port } = require('../shared/constants/common');

const router = express.Router();

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(express.static('dist'));

router.post('/setLyrics', (req, res) => {
    const { path, lyrics } = req.body;
    const tags = { lyrics };

    const result = setTags(path, tags);

    const responseStatus = result ? SUCCESS : ERROR;
    res.send(JSON.stringify({ responseStatus }));
});

app.use('/', router);

app.listen(port, () => console.log(`Listening on port ${port}`));
