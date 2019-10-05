import buildUrl, { BuildUrlOptions } from 'build-url';
import fetch, { RequestInfo, RequestInit } from 'node-fetch';

export const fetchApiRequest = (
    url: string,
    headers?: RequestInit['headers'],
    path?: BuildUrlOptions['path'],
    queryParams?: BuildUrlOptions['queryParams']
) => {
    const finalUrl = buildUrl(url, {
        path,
        queryParams
    });

    try {
        return fetch(finalUrl, {
            headers,
            method: 'GET'
        }).then(response => {
            const { ok, status } = response;

            if (!ok) {
                console.log('GET Api Request status: ', status);
                return null;
            }
            return response.json();
        });
    } catch (e) {
        console.log('GET Api Request error', e);
        return null;
    }
};

export const fetchPostApiRequest = (
    url: RequestInfo,
    headers: RequestInit['headers'],
    body: RequestInit['body']
) => {
    try {
        return fetch(url, {
            headers,
            method: 'POST',
            body
        }).then(response => {
            const { ok, status } = response;

            if (!ok) {
                console.log('POST Api Request status: ', status);
                return null;
            }
            return response.json();
        });
    } catch (e) {
        console.log('POST Api Request error', e);
        return null;
    }
};

export const fetchHtmlRequest = (url: RequestInfo) => {
    try {
        return fetch(url, {
            method: 'GET'
        }).then(response => {
            const { ok, status } = response;

            if (!ok) {
                console.log('GET Html Request status: ', status);
                return null;
            }
            return response.text();
        });
    } catch (e) {
        console.log('GET Html Request error', e);
        return null;
    }
};

export const fetchPostHtmlRequest = (
    url: RequestInfo,
    headers: RequestInit['headers'],
    body: RequestInit['body']
) => {
    try {
        return fetch(url, {
            headers,
            method: 'POST',
            body
        }).then(response => {
            const { ok, status } = response;

            if (!ok) {
                console.log('POST Html Request status: ', status);
                return null;
            }
            return response.text();
        });
    } catch (e) {
        console.log('POST Html Request error', e);
        return null;
    }
};
