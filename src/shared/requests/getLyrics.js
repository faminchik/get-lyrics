import { fetchPostHtmlRequest } from 'shared/utils/fetchRequests';
import { serverSidePort as port } from 'shared/constants/common';
import rt from 'shared/constants/RequestTypes';

export default trackUrl =>
    fetchPostHtmlRequest(
        `http://localhost:${port}/${rt.GET_LYRICS}`,
        { 'Content-Type': 'application/json' },
        { trackUrl }
    );
