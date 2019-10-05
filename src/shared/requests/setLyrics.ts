import { SetTagsData, SetTagsResult } from 'ts/interfaces/nodeID3.interfaces';
import { fetchPostApiRequest } from 'shared/utils/fetchRequests';
import { serverSidePort as port } from 'shared/constants/common';
import rt from 'shared/constants/RequestTypes';

export default (
    path: SetTagsData['path'],
    lyrics: SetTagsData['lyrics']
): Promise<SetTagsResult> | null =>
    fetchPostApiRequest(
        `http://localhost:${port}/${rt.SET_LYRICS}`,
        { 'Content-Type': 'application/json' },
        JSON.stringify({
            path,
            lyrics
        })
    );
