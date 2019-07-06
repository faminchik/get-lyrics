require('dotenv').config();
import Genius from 'server/utils/Genius/Genius';

const { GENIUS_ACCESS_TOKEN } = process.env;

export default async name => {
    if (!GENIUS_ACCESS_TOKEN) {
        console.error('Seems like you forgot to pass Genius Access Token');
        return null;
    }

    const genius = new Genius(GENIUS_ACCESS_TOKEN);

    return await genius.getTrack(name);
};
