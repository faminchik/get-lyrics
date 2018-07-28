const Genius = require('../utils/Genius/Genius');
const { ACCESS_TOKEN } = require('../constants/geniusConstants');

const getTrack = async trackUrl => {
    const genius = new Genius(ACCESS_TOKEN);

    return await genius.getLyricsByTrackUrl(trackUrl);
};

module.exports = getTrack;
