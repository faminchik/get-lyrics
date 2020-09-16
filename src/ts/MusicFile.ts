import { SFile } from 'ts/File';
import mfp from 'client/constants/MusicFileProperties';
import rs from 'shared/constants/ResponseStatus';

export interface MusicFile extends SFile {
    [mfp.ID]: string;
    [mfp.NAME_WITH_EXTENSION]: string;
    [mfp.SET_LYRICS_STATUS]: rs | null;
    [mfp.LYRICS]: string;
    [mfp.SHOULD_SEARCH_LYRICS]: boolean;
    [mfp.TRACK_URL]: string;
    [mfp.ARTWORK]: string;
    [mfp.ARE_TAGS_FOUND]: boolean | null;
}
