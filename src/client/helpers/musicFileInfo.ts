import { v4 as uuidv4 } from 'uuid';
import mfp from 'client/constants/MusicFileProperties';
import { SFile } from 'ts/interfaces/file.interfaces';
import { MusicFile } from 'ts/interfaces/musicFile.interfaces';
import { getFileNameByFullName } from 'client/utils/fileNames';

const defaultAdditionalParams = {
    [mfp.SET_LYRICS_STATUS]: null,
    [mfp.LYRICS]: '',
    [mfp.SHOULD_SEARCH_LYRICS]: true,
    [mfp.TRACK_URL]: '',
    [mfp.ARTWORK]: '',
    [mfp.ARE_TAGS_FOUND]: null
};

export const extendMusicFileInfo = (musicFile: SFile): MusicFile => {
    const { name: fileFullName, ...restData } = musicFile;
    const fileName = getFileNameByFullName(fileFullName);

    return {
        [mfp.NAME]: fileName,
        [mfp.NAME_WITH_EXTENSION]: fileFullName,
        [mfp.ID]: uuidv4(),
        ...restData,
        ...defaultAdditionalParams
    };
};

export const resetMusicFileAdditionalParams = (musicFile: MusicFile): MusicFile => ({
    ...musicFile,
    ...defaultAdditionalParams
});
