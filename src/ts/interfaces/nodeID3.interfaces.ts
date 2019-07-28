export interface SetTagsResult {
    status: string;
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
