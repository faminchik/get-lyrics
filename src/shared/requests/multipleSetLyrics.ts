import { MultipleSetTagsData, MultipleSetTagsResult } from 'ts/interfaces/nodeID3.interfaces';
import { fetchPostApiRequest } from 'shared/utils/fetchRequests';
import { serverSidePort as port } from 'shared/constants/common';
import rt from 'shared/constants/RequestTypes';

export default (data: MultipleSetTagsData[]): Promise<MultipleSetTagsResult[]> | null =>
    fetchPostApiRequest(
        `http://localhost:${port}/${rt.MULTIPLE_SET_LYRICS}`,
        { 'Content-Type': 'application/json' },
        JSON.stringify(data)
    );
