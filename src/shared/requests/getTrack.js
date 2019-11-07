import { fetchPostApiRequest } from 'shared/utils/fetchRequests';
import { serverSidePort as port } from 'shared/constants/common';
import { GET_TRACK } from 'shared/constants/requestTypes';
import isDevelopment from 'server/utils/isDevelopment';

export default name => {
    const baseUrl = isDevelopment ? `http://localhost:${port}` : process.env.HOST_URL;

    return fetchPostApiRequest(
        `${baseUrl}/${GET_TRACK}`,
        { 'Content-Type': 'application/json' },
        { name }
    );
};
