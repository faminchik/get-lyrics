import { fetchPostApiRequest } from 'shared/utils/fetchRequests';
import { serverSidePort as port } from 'shared/constants/common';
import { MULTIPLE_SET_LYRICS } from 'shared/constants/requestTypes';

export default async data =>
    await fetchPostApiRequest(
        `http://localhost:${port}/${MULTIPLE_SET_LYRICS}`,
        { 'Content-Type': 'application/json' },
        { data }
    );
