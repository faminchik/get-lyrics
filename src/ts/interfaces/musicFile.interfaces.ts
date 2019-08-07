import { SFile } from 'ts/interfaces/file.interfaces';
import { SUCCESS, ERROR } from 'shared/constants/responseStatus';

export interface MusicFile extends SFile {
    id: string;
    nameWithExtension: string;
    setLyricsStatus: typeof SUCCESS | typeof ERROR | null;
    lyrics: string;
    shouldSearchLyrics: boolean;
    trackUrl: string;
    artwork: string;
    areTagsFound: boolean | null;
}
