import { fetchPostApiRequest } from '../utils/fetchRequests';
import { serverSidePort as port } from '../constants/common';
import { SET_LYRICS } from '../constants/requestTypes';

export default async (path, lyrics) =>
    await fetchPostApiRequest(
        `http://localhost:${port}/${SET_LYRICS}`,
        { 'Content-Type': 'application/json' },
        { path, lyrics }
    );
