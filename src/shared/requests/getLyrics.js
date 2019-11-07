import { fetchPostHtmlRequest } from 'shared/utils/fetchRequests';
import { serverSidePort as port } from 'shared/constants/common';
import { GET_LYRICS } from 'shared/constants/requestTypes';
import isDevelopment from 'server/utils/isDevelopment';

export default trackUrl => {
    const baseUrl = isDevelopment ? `http://localhost:${port}` : process.env.HOST_URL;

    return fetchPostHtmlRequest(
        `${baseUrl}/${GET_LYRICS}`,
        { 'Content-Type': 'application/json' },
        { trackUrl }
    );
};
