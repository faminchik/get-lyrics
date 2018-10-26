import { fetchPostHtmlRequest } from '../utils/fetchRequests';
import { serverSidePort as port } from '../constants/common';
import { GET_LYRICS } from '../constants/requestTypes';

export default async trackUrl =>
    await fetchPostHtmlRequest(
        `http://localhost:${port}/${GET_LYRICS}`,
        { 'Content-Type': 'application/json' },
        { trackUrl }
    );
