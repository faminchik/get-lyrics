import _ from 'lodash';

export const findMostLikelyCorrectTrack = (tracks, desiredTrackName) => {
    if (_.isNil(tracks)) return null;

    const { hits } = tracks;
    const keywords = _.split(desiredTrackName, ' ');

    const mapper = _.map(hits, track => {
        const fullTitle = _.get(track, 'result.full_title', '');
        const upperCaseFullTitle = _.toUpper(fullTitle);

        const foundKeywords = _.reduce(
            keywords,
            (acc, keyword) => {
                if (_.includes(upperCaseFullTitle, _.toUpper(keyword))) acc.push(keyword);
                return acc;
            },
            []
        );
        return { foundKeywords, track };
    });

    const mostLikelyCorrectItem = _.maxBy(mapper, ({ foundKeywords }) => _.size(foundKeywords));
    return _.get(mostLikelyCorrectItem, 'track.result', null);
};
