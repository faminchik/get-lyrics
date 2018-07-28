const _ = require('lodash');
const cheerio = require('cheerio');
const { fetchApiRequest, fetchHtmlRequest } = require('../../../shared/utils/fetchRequests');
const { BASE_URL, SEARCH_URL } = require('../../constants/geniusConstants');
const parseSearchResponse = require('./parseSearchResponse');

class Genius {
    constructor(accessToken) {
        this.accessToken = accessToken;

        this.authHeader = {
            Authorization: 'Bearer ' + this.accessToken
        };
    }

    _requestPromise(options) {
        const { path, queryParams = {} } = options;
        return new Promise((resolve, reject) => {
            fetchApiRequest(BASE_URL, this.authHeader, path, queryParams).then(data => {
                console.log('data', data);

                const status = _.get(data, 'meta.status');
                if (status !== 200) {
                    const payload = {
                        error: data,
                        status
                    };
                    reject(payload);
                }
                resolve(_.get(data, 'response', null));
            });
        });
    }

    search(query) {
        const options = {
            path: SEARCH_URL,
            queryParams: {
                q: query
            }
        };

        return this._requestPromise(options);
    }

    async getTrack(musicTrack) {
        const tracks = await this.search(musicTrack);
        return parseSearchResponse(tracks, musicTrack);
    }

    async getLyricsByTrackName(musicTrack) {
        const track = await this.getTrack(musicTrack);
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

module.exports = Genius;
