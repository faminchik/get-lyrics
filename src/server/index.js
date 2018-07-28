const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const setTags = require('./helpers/setTags');
const getTrack = require('./helpers/getTrack');
const getLyrics = require('./helpers/getLyrics');
const { SUCCESS, ERROR } = require('../shared/constants/responseStatus');
const { SET_LYRICS, GET_TRACK, GET_LYRICS } = require('../shared/constants/requestTypes');
const { port } = require('../shared/constants/common');

const router = express.Router();

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(express.static('dist'));

router.post(`/${SET_LYRICS}`, (req, res) => {
    const { path, lyrics } = req.body;
    const tags = { lyrics };

    const result = setTags(path, tags);

    const responseStatus = result ? SUCCESS : ERROR;
    res.send(JSON.stringify({ responseStatus }));
});

router.post(`/${GET_TRACK}`, async (req, res) => {
    const { name } = req.body;
    const track = await getTrack(name);

    res.send(track);
});

router.post(`/${GET_LYRICS}`, async (req, res) => {
    const { trackUrl } = req.body;
    const lyrics = await getLyrics(trackUrl);

    res.send(lyrics);
});

app.use('/', router);

app.listen(port, () => console.log(`Listening on port ${port}`));
