import { fetchPostApiRequest } from 'shared/utils/fetchRequests';
import { serverSidePort as port } from 'shared/constants/common';
import { SET_LYRICS } from 'shared/constants/requestTypes';

export default (path, lyrics) =>
    fetchPostApiRequest(
        `http://localhost:${port}/${SET_LYRICS}`,
        { 'Content-Type': 'application/json' },
        { path, lyrics }
    );
