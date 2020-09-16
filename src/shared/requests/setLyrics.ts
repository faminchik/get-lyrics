import { SetTagsData, SetTagsResult } from 'ts/NodeID3';
import { fetchPostApiRequest } from 'shared/utils/fetchRequests';
import { serverSidePort as port } from 'shared/constants/common';
import rt from 'shared/constants/RequestTypes';
import isDevelopment from 'server/utils/isDevelopment';

export default (
    path: SetTagsData['path'],
    lyrics: SetTagsData['lyrics']
): Promise<SetTagsResult | null> => {
    const baseUrl = isDevelopment ? `http://localhost:${port}` : process.env.HOST_URL;

    return fetchPostApiRequest(
        `${baseUrl}/${rt.SET_LYRICS}`,
        { 'Content-Type': 'application/json' },
        JSON.stringify({ path, lyrics })
    );
};
