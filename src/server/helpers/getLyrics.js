import Genius from '../utils/Genius/Genius';
import { ACCESS_TOKEN } from '../constants/geniusConstants';

export default async trackUrl => {
    const genius = new Genius(ACCESS_TOKEN);

    return await genius.getLyricsByTrackUrl(trackUrl);
};
