import rs from 'shared/constants/ResponseStatus';

export interface SetTagsResult {
    status: rs;
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
