import express from 'express';
import {
    SetTagsData,
    SetTagsResult,
    MultipleSetTagsData,
    MultipleSetTagsResult
} from 'ts/interfaces/nodeID3.interfaces';
import { GeniusApiTrack } from 'ts/types/genius.types';
import { getTrack, getLyrics } from 'server/helpers/memoizedGeniusGetters';
import setTags from 'server/helpers/setTags';
import multipleSetTags from 'server/helpers/multipleSetTags';
import rt from 'shared/constants/RequestTypes';

const router = express.Router();

router.post(`/${rt.SET_LYRICS}`, (req, res) => {
    const { path, lyrics }: SetTagsData = req.body;
    const resultInfo: SetTagsResult = setTags({ path, lyrics });

    res.send(JSON.stringify(resultInfo));
});

router.post(`/${rt.MULTIPLE_SET_LYRICS}`, (req, res) => {
    const data: MultipleSetTagsData[] = req.body;
    const resultInfo: MultipleSetTagsResult[] = multipleSetTags(data);

    res.send(JSON.stringify(resultInfo));
});

router.post(`/${rt.GET_TRACK}`, async (req, res) => {
    const { name }: { name: string } = req.body;
    const track: GeniusApiTrack | null = await getTrack(name);

    res.send(JSON.stringify(track));
});

router.post(`/${rt.GET_LYRICS}`, async (req, res) => {
    const { trackUrl }: { trackUrl: string } = req.body;
    const lyrics: string = await getLyrics(trackUrl);

    res.send(lyrics);
});

export default router;
