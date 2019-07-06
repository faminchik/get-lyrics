import { fetchPostHtmlRequest } from 'shared/utils/fetchRequests';
import { serverSidePort as port } from 'shared/constants/common';
import { GET_LYRICS } from 'shared/constants/requestTypes';

export default async trackUrl =>
    await fetchPostHtmlRequest(
        `http://localhost:${port}/${GET_LYRICS}`,
        { 'Content-Type': 'application/json' },
        { trackUrl }
    );
