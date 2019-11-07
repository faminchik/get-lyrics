import { fetchPostApiRequest } from 'shared/utils/fetchRequests';
import { serverSidePort as port } from 'shared/constants/common';
import { SET_LYRICS } from 'shared/constants/requestTypes';
import isDevelopment from 'server/utils/isDevelopment';

export default async (path, lyrics) => {
    const baseUrl = isDevelopment ? `http://localhost:${port}` : process.env.HOST_URL;

    return fetchPostApiRequest(
        `${baseUrl}/${SET_LYRICS}`,
        { 'Content-Type': 'application/json' },
        { path, lyrics }
    );
};
