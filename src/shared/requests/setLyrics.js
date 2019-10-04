import { fetchPostApiRequest } from 'shared/utils/fetchRequests';
import { serverSidePort as port } from 'shared/constants/common';
import rt from 'shared/constants/RequestTypes';

export default (path, lyrics) =>
    fetchPostApiRequest(
        `http://localhost:${port}/${rt.SET_LYRICS}`,
        { 'Content-Type': 'application/json' },
        { path, lyrics }
    );
