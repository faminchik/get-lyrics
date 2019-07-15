import _ from 'lodash';
import config from 'config';
import cheerio from 'cheerio';
import { fetchApiRequest, fetchHtmlRequest } from 'shared/utils/fetchRequests';
import { findMostLikelyCorrectTrack } from 'server/utils/Genius/parseSearchResponse';

const BASE_URL = config.get('genius-base-url');
const SEARCH_PARAM = config.get('genius-param-search');

export default class Genius {
    constructor(accessToken) {
        this.accessToken = accessToken;

        this.authHeader = {
            Authorization: 'Bearer ' + this.accessToken
        };
    }

    _requestPromise(options) {
        const { path, queryParams = {} } = options;
        return new Promise(resolve => {
            fetchApiRequest(BASE_URL, this.authHeader, path, queryParams).then(data => {
                const status = _.get(data, 'meta.status');
                if (status !== 200) {
                    resolve(null);
                }
                resolve(_.get(data, 'response', null));
            });
        });
    }

    search(query) {
        const options = {
            path: SEARCH_PARAM,
            queryParams: {
                q: query
            }
        };

        return this._requestPromise(options);
    }

    async getTrack(trackName) {
        const tracks = await this.search(trackName);
        return findMostLikelyCorrectTrack(tracks, trackName);
    }

    async getLyricsByTrackName(trackName) {
        const track = await this.getTrack(trackName);
        const { url } = track;
        const html = await fetchHtmlRequest(url);

        return this._scrapLyrics(html);
    }

    async getLyricsByTrackUrl(trackUrl) {
        const html = await fetchHtmlRequest(trackUrl);
        return this._scrapLyrics(html);
    }

    _scrapLyrics(html) {
        const $ = cheerio.load(html);

        return $('.lyrics')
            .text()
            .trim();
    }
}
