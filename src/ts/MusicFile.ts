import { SFile } from 'ts/File';
import rs from 'shared/constants/ResponseStatus';

export interface MusicFile extends SFile {
    id: string;
    nameWithExtension: string;
    setLyricsStatus: rs | null;
    lyrics: string;
    shouldSearchLyrics: boolean;
    trackUrl: string;
    artwork: string;
    areTagsFound: boolean | null;
}
