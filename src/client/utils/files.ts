import _ from 'lodash';
import { FFile, SFile } from 'ts/File';

export const convertFileToObject = (file: FFile): SFile => {
    const { name, path = null, type, size, lastModified } = file;
    return { name, path, type, size, lastModified };
};

export const detectUniqueFiles = (existingFiles: SFile[], newFiles: SFile[]): SFile[] => {
    if (_.isNil(existingFiles) || _.isNil(newFiles)) return [];
    if (_.isEmpty(newFiles)) return [];
    if (_.isEmpty(existingFiles)) return newFiles;

    return _.reduce(
        newFiles,
        (newUniqueFiles: SFile[], newFile) => {
            const isUnique = _.every(existingFiles, existingFile =>
                isNewFileUnique(existingFile, newFile)
            );

            if (isUnique) newUniqueFiles.push(newFile);
            return newUniqueFiles;
        },
        []
    );
};

const isNewFileUnique = (existingFile: SFile, newFile: SFile): boolean =>
    existingFile.lastModified !== newFile.lastModified ||
    existingFile.path !== newFile.path ||
    existingFile.size !== newFile.size ||
    existingFile.type !== newFile.type;
