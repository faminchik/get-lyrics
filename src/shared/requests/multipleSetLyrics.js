import { fetchPostApiRequest } from 'shared/utils/fetchRequests';
import { serverSidePort as port } from 'shared/constants/common';
import rt from 'shared/constants/RequestTypes';

export default data =>
    fetchPostApiRequest(
        `http://localhost:${port}/${rt.MULTIPLE_SET_LYRICS}`,
        { 'Content-Type': 'application/json' },
        { ...data }
    );
