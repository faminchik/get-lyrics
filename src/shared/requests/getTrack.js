import { fetchPostApiRequest } from 'shared/utils/fetchRequests';
import { serverSidePort as port } from 'shared/constants/common';
import { GET_TRACK } from 'shared/constants/requestTypes';

export default async name =>
    await fetchPostApiRequest(
        `http://localhost:${port}/${GET_TRACK}`,
        { 'Content-Type': 'application/json' },
        { name }
    );
