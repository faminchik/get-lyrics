import { fetchPostApiRequest } from '../utils/fetchRequests';
import { serverSidePort as port } from '../constants/common';
import { MULTIPLE_SET_LYRICS } from '../constants/requestTypes';

export default async data =>
    await fetchPostApiRequest(
        `http://localhost:${port}/${MULTIPLE_SET_LYRICS}`,
        { 'Content-Type': 'application/json' },
        { data }
    );
