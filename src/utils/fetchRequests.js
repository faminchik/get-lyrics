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
                console.log('Api Requesty status: ', status);
                return null;
            }
            return response.json();
        });
    } catch (e) {
        console.log('Api Request error', e);
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
                console.log('Html Request status: ', status);
                return null;
            }
            return response.text();
        });
    } catch (e) {
        console.log('Html Request error', e);
        return null;
    }
};
