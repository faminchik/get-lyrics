import { MultipleSetTagsData, MultipleSetTagsResult } from 'ts/interfaces/nodeID3.interfaces';
import { fetchPostApiRequest } from 'shared/utils/fetchRequests';
import { serverSidePort as port } from 'shared/constants/common';
import rt from 'shared/constants/RequestTypes';
import isDevelopment from 'server/utils/isDevelopment';

export default (data: MultipleSetTagsData[]): Promise<MultipleSetTagsResult[] | null> => {
    const baseUrl = isDevelopment ? `http://localhost:${port}` : process.env.HOST_URL;

    return fetchPostApiRequest(
        `${baseUrl}/${rt.MULTIPLE_SET_LYRICS}`,
        { 'Content-Type': 'application/json' },
        JSON.stringify(data)
    );
};
