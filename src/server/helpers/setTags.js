const nodeID3 = require('node-id3');

const setTags = (filePath, { lyrics }) => {
    const tags = {
        unsynchronisedLyrics: {
            language: 'eng',
            text: lyrics
        }
    };

    return nodeID3.update(tags, filePath);
};

module.exports = setTags;
