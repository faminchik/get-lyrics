import uuidv4 from 'uuid/v4';
import * as mfp from 'client/constants/MusicFileProperties';
import { getFileNameByFullName } from 'client/utils/fileNames';

const defaultAdditionalParams = {
    [mfp.SET_LYRICS_STATUS]: null,
    [mfp.LYRICS]: null,
    [mfp.SHOULD_SEARCH_LYRICS]: true,
    [mfp.TRACK_URL]: null,
    [mfp.ARTWORK]: null,
    [mfp.ARE_TAGS_FOUND]: null
};

export const extendMusicFileInfo = musicFile => {
    const { [mfp.NAME]: fileFullName = null, ...restData } = musicFile;
    const fileName = getFileNameByFullName(fileFullName);

    return {
        [mfp.NAME]: fileName,
        [mfp.NAME_WITH_EXTENSION]: fileFullName,
        [mfp.ID]: uuidv4(),
        ...restData,
        ...defaultAdditionalParams
    };
};

export const resetMusicFileAdditionalParams = musicFile => ({
    ...musicFile,
    ...defaultAdditionalParams
});
