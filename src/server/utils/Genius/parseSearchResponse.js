import _ from 'lodash';

const findFirstCorrectTrack = (tracks, keywords) => {
    for (let track in tracks) {
        const trackUrl = _.get(tracks[track], 'result.url');
        const foundWords = [];

        console.log('trackUrl', trackUrl);
        for (let word in keywords) {
            if (trackUrl.toLowerCase().includes(keywords[word].toLowerCase())) {
                foundWords.push(keywords[word]);
            }
        }

        console.log('foundWords', foundWords);
        if (!_.isEmpty(foundWords)) {
            return tracks[track].result;
        }
    }

    return null;
};

export default (tracks, desiredTrack) => {
    if (_.isNil(tracks)) return null;

    const { hits } = tracks;
    console.log('hits', hits);

    const keywords = _.split(desiredTrack, ' ');
    console.log('keywords', keywords);

    return findFirstCorrectTrack(hits, keywords);
};
