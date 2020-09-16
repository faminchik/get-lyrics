import _ from 'lodash';
import config from 'config';
import cheerio from 'cheerio';
import { GenuisApiSearchResult, GeniusApiTrack } from 'ts/types/genius.types';
import { fetchApiRequest, fetchHtmlRequest } from 'shared/utils/fetchRequests';
import { findMostLikelyCorrectTrack } from 'server/utils/Genius/parseSearchResponse';

const BASE_URL: string = config.get('genius-base-url');
const SEARCH_PARAM: string = config.get('genius-param-search');

type SearchOptions = {
    path: string;
    queryParams: { q: string };
};

export default class Genius {
    private accessToken: string;

    private authHeader: { Authorization: string };

    constructor(accessToken: string) {
        this.accessToken = accessToken;

        this.authHeader = {
            Authorization: 'Bearer ' + this.accessToken
        };
    }

    private requestPromise(options: SearchOptions): Promise<GenuisApiSearchResult | null> {
        const { path, queryParams = { q: '' } } = options;
        return new Promise(async resolve => {
            const data = await fetchApiRequest(BASE_URL, this.authHeader, path, queryParams);

            const status = _.get(data, 'meta.status');
            if (status !== 200) resolve(null);

            resolve(_.get(data, 'response', null));
        });
    }

    private search(query: string): Promise<GenuisApiSearchResult | null> {
        const options: SearchOptions = {
            path: SEARCH_PARAM,
            queryParams: {
                q: query
            }
        };

        return this.requestPromise(options);
    }

    async getTrack(trackName: string): Promise<GeniusApiTrack | null> {
        const tracks = await this.search(trackName);
        if (_.isNil(tracks)) return null;

        return findMostLikelyCorrectTrack(tracks, trackName);
    }

    async getLyricsByTrackName(trackName: string): Promise<string> {
        const track = await this.getTrack(trackName);
        if (!track) return '';

        const { url } = track;
        const html = await fetchHtmlRequest(url);

        return this.scrapLyrics(html);
    }

    async getLyricsByTrackUrl(trackUrl: string): Promise<string> {
        const html = await fetchHtmlRequest(trackUrl);
        return this.scrapLyrics(html);
    }

    private scrapLyrics(html: string | null): string {
        if (!html) return '';

        const $ = cheerio.load(html);

        return $('.lyrics').text().trim();
    }
}
