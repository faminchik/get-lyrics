const Genius = require('../utils/Genius/Genius');
const { ACCESS_TOKEN } = require('../constants/geniusConstants');

const getTrack = async name => {
    const genius = new Genius(ACCESS_TOKEN);

    return await genius.getTrack(name);
};

module.exports = getTrack;
