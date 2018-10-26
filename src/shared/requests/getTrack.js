import { fetchPostApiRequest } from '../utils/fetchRequests';
import { serverSidePort as port } from '../constants/common';
import { GET_TRACK } from '../constants/requestTypes';

export default async name =>
    await fetchPostApiRequest(
        `http://localhost:${port}/${GET_TRACK}`,
        { 'Content-Type': 'application/json' },
        { name }
    );
