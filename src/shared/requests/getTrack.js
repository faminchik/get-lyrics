import { fetchPostApiRequest } from 'shared/utils/fetchRequests';
import { serverSidePort as port } from 'shared/constants/common';
import rt from 'shared/constants/RequestTypes';

export default name =>
    fetchPostApiRequest(
        `http://localhost:${port}/${rt.GET_TRACK}`,
        { 'Content-Type': 'application/json' },
        { name }
    );
