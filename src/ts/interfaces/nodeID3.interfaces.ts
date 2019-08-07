import { SUCCESS, ERROR } from 'shared/constants/responseStatus';

export interface SetTagsResult {
    status: typeof SUCCESS | typeof ERROR;
}

export interface MultipleSetTagsResult extends SetTagsResult {
    id: string;
}

export interface SetTagsData {
    path: string;
    lyrics: string;
}

export interface MultipleSetTagsData extends SetTagsData {
    id: string;
}
