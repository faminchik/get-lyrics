// full file
export interface FFile extends File {
    readonly path?: string | null;
}

// short file
export interface SFile {
    readonly name: string;
    readonly path: string | null;
    readonly type: string;
    readonly size: number;
    readonly lastModified: number;
}
