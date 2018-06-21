import _ from 'lodash';

const findFirstCorrectUrl = (tracks, keywords) => {
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
            return {
                url: trackUrl
            };
        }
    }
};

export default (tracks, desiredTrack) => {
    if (_.isNil(tracks)) return null;

    const { hits } = tracks;
    console.log('hits', hits);

    const keywords = _.split(desiredTrack, ' ');
    console.log('keywords', keywords);

    const result = findFirstCorrectUrl(hits, keywords);

    console.log('result', result);
    return _.get(result, 'url', null);
};
