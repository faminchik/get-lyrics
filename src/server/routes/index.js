import express from 'express';
import setTags from 'server/helpers/setTags';
import getTrack from 'server/helpers/getTrack';
import getLyrics from 'server/helpers/getLyrics';
import multipleSetTags from 'server/helpers/multipleSetTags';
import {
    SET_LYRICS,
    GET_TRACK,
    GET_LYRICS,
    MULTIPLE_SET_LYRICS
} from 'shared/constants/requestTypes';

const router = express.Router();

router.post(`/${SET_LYRICS}`, (req, res) => {
    const { path, lyrics } = req.body;
    const tags = { lyrics };
    const resultInfo = setTags(path, tags);

    res.send(JSON.stringify(resultInfo));
});

router.post(`/${MULTIPLE_SET_LYRICS}`, (req, res) => {
    const { data } = req.body;
    const resultInfo = multipleSetTags(data);

    res.send(JSON.stringify(resultInfo));
});

router.post(`/${GET_TRACK}`, async (req, res) => {
    const { name } = req.body;
    const track = await getTrack(name);

    res.send(JSON.stringify(track));
});

router.post(`/${GET_LYRICS}`, async (req, res) => {
    const { trackUrl } = req.body;
    const lyrics = await getLyrics(trackUrl);

    res.send(lyrics);
});

export default router;
