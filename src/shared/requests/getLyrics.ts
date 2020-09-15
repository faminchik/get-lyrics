import { fetchPostApiRequest } from 'shared/utils/fetchRequests';
import { serverSidePort as port } from 'shared/constants/common';
import rt from 'shared/constants/RequestTypes';
import isDevelopment from 'server/utils/isDevelopment';

export default (trackUrl: string): Promise<string> | null => {
    const baseUrl = isDevelopment ? `http://localhost:${port}` : process.env.HOST_URL;

    return fetchPostApiRequest(
        `${baseUrl}/${rt.GET_LYRICS}`,
        { 'Content-Type': 'application/json' },
        JSON.stringify({ trackUrl })
    );
};
