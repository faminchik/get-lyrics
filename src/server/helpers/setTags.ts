import nodeID3, { Tags } from 'node-id3';
import { SetTagsData, SetTagsResult } from 'ts/NodeID3';
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

    const result = nodeID3.update(tags, path);
    const status = typeof result === 'boolean' ? rs.SUCCESS : rs.ERROR;
    return { status };
};
