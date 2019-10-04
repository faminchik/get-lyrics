import nodeID3 from 'node-id3';
import { Tags } from 'ts/types/nodeID3.types';
import { SetTagsData, SetTagsResult } from 'ts/interfaces/nodeID3.interfaces';
import { isFileExists } from 'server/utils/files';
import rs from 'shared/constants/ResponseStatus';

export default ({ path, lyrics }: SetTagsData): SetTagsResult => {
    if (!path || !isFileExists(path)) return { status: rs.ERROR };

    const tags: Tags = {
        unsynchronisedLyrics: {
            language: 'eng',
            text: lyrics
        }
    };

    const result: boolean = nodeID3.update(tags, path);
    const status = result ? rs.SUCCESS : rs.ERROR;
    return { status };
};
