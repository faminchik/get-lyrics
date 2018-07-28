import nodeID3 from 'node-id3';

export default (filePath, { lyrics }) => {
    if (!filePath) return false;

    const tags = {
        unsynchronisedLyrics: {
            language: 'eng',
            text: lyrics
        }
    };

    return nodeID3.update(tags, filePath);
};
