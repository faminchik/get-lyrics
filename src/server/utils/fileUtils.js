import fs from 'fs';

export const isFileExists = path => {
    try {
        return fs.statSync(path).isFile();
    } catch (err) {
        return false;
    }
};
