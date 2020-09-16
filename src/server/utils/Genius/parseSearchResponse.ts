import _ from 'lodash';
import { GenuisApiSearchResult, GeniusApiTrack } from 'ts/Genius';

export const findMostLikelyCorrectTrack = (
    tracks: GenuisApiSearchResult,
    desiredTrackName: string
): GeniusApiTrack | null => {
    const { hits } = tracks;
    const keywords = _.split(desiredTrackName, ' ');

    const mapper = _.map(hits, track => {
        const fullTitle = track.result.full_title;
        const upperCaseFullTitle = _.toUpper(fullTitle);

        const foundKeywords = _.reduce(
            keywords,
            (acc: string[], keyword) => {
                if (_.includes(upperCaseFullTitle, _.toUpper(keyword))) acc.push(keyword);
                return acc;
            },
            []
        );
        return { foundKeywords, track };
    });

    const mostLikelyCorrectItem = _.maxBy(mapper, ({ foundKeywords }) => _.size(foundKeywords));
    return mostLikelyCorrectItem?.track.result ?? null;
};
