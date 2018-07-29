import express from 'express';
import setTags from '../helpers/setTags';
import getTrack from '../helpers/getTrack';
import getLyrics from '../helpers/getLyrics';
import { SUCCESS, ERROR } from '../../shared/constants/responseStatus';
import { SET_LYRICS, GET_TRACK, GET_LYRICS } from '../../shared/constants/requestTypes';

const router = express.Router();

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

    res.send(JSON.stringify({ track }));
});

router.post(`/${GET_LYRICS}`, async (req, res) => {
    const { trackUrl } = req.body;
    const lyrics = await getLyrics(trackUrl);

    res.send(lyrics);
});

export default router;
