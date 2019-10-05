import { fetchPostApiRequest } from 'shared/utils/fetchRequests';
import { serverSidePort as port } from 'shared/constants/common';
import rt from 'shared/constants/RequestTypes';

export default (trackUrl: string): Promise<string> | null =>
    fetchPostApiRequest(
        `http://localhost:${port}/${rt.GET_LYRICS}`,
        { 'Content-Type': 'application/json' },
        JSON.stringify({
            trackUrl
        })
    );
