require('dotenv').config();
import _ from 'lodash';
import Genius from 'server/utils/Genius/Genius';

const { GENIUS_ACCESS_TOKEN } = process.env;

if (!GENIUS_ACCESS_TOKEN) {
    throw new Error('Seems like you forgot to pass Genius Access Token');
}

const genius = new Genius(GENIUS_ACCESS_TOKEN);

export const getTrack = _.memoize(genius.getTrack.bind(genius));

export const getLyrics = genius.getLyricsByTrackUrl.bind(genius);
