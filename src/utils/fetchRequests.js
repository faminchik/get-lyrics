export const fetchApiRequest = async (url, headers, queryString) => {
    const finalUrl = new URL(url);
    finalUrl.search = new URLSearchParams(queryString);

    try {
        return await fetch(finalUrl, {
            headers,
            method: 'GET'
        }).then(response => {
            const { ok } = response;
            const { status } = response;

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

export const fetchPostApiRequest = async (url, headers, body) => {
    try {
        return await fetch(url, {
            headers,
            method: 'POST',
            body: JSON.stringify(body)
        }).then(response => {
            const { ok } = response;
            const { status } = response;

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

export const fetchHtmlRequest = async url => {
    try {
        return await fetch(url, {
            method: 'GET'
        }).then(response => {
            const { ok } = response;
            const { status } = response;

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
