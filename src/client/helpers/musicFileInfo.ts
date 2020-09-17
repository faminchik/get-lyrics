import { v4 as uuidv4 } from 'uuid';
import { SFile } from 'ts/File';
import { MusicFile } from 'ts/MusicFile';
import { getFileNameByFullName } from 'client/utils/fileNames';

const defaultAdditionalParams: Pick<
    MusicFile,
    'setLyricsStatus' | 'lyrics' | 'shouldSearchLyrics' | 'trackUrl' | 'artwork' | 'areTagsFound'
> = {
    setLyricsStatus: null,
    lyrics: '',
    shouldSearchLyrics: true,
    trackUrl: '',
    artwork: '',
    areTagsFound: null
};

export const extendMusicFileInfo = (musicFile: SFile): MusicFile => {
    const { name: fileFullName, ...restData } = musicFile;
    const fileName = getFileNameByFullName(fileFullName);

    return {
        name: fileName,
        nameWithExtension: fileFullName,
        id: uuidv4(),
        ...restData,
        ...defaultAdditionalParams
    };
};

export const resetMusicFileAdditionalParams = (musicFile: MusicFile): MusicFile => ({
    ...musicFile,
    ...defaultAdditionalParams
});
