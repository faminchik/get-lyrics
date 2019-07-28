import fs from 'fs';

export const isFileExists = (path: string): boolean => {
    try {
        return fs.statSync(path).isFile();
    } catch (err) {
        return false;
    }
};
