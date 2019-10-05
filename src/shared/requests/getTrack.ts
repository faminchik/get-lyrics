import { GeniusApiTrack } from 'ts/types/genius.types';
import { fetchPostApiRequest } from 'shared/utils/fetchRequests';
import { serverSidePort as port } from 'shared/constants/common';
import rt from 'shared/constants/RequestTypes';

export default (name: string): Promise<GeniusApiTrack | null> | null =>
    fetchPostApiRequest(
        `http://localhost:${port}/${rt.GET_TRACK}`,
        { 'Content-Type': 'application/json' },
        JSON.stringify({
            name
        })
    );
