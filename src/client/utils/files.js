import _ from 'lodash';
import * as mfp from 'client/constants/MusicFileProperties';

export const convertFileToObject = file => {
    const {
        [mfp.NAME]: name,
        [mfp.PATH]: path = null,
        type,
        size,
        lastModified,
        preview,
        webkitRelativePath
    } = file;
    return { name, path, type, size, lastModified, preview, webkitRelativePath };
};

export const detectUniqueFiles = (existingFiles, newFiles) => {
    if (_.isNil(existingFiles) || _.isNil(newFiles)) return [];
    if (_.isEmpty(newFiles)) return [];
    if (_.isEmpty(existingFiles)) return newFiles;

    return _.reduce(
        newFiles,
        (newUniqueFiles, newFile) => {
            const isUnique = _.every(existingFiles, existingFile =>
                isNewFileUnique(existingFile, newFile)
            );

            if (isUnique) newUniqueFiles.push(newFile);
            return newUniqueFiles;
        },
        []
    );
};

const isNewFileUnique = (existingFile, newFile) =>
    existingFile.lastModified !== newFile.lastModified ||
    existingFile[mfp.PATH] !== newFile[mfp.PATH] ||
    existingFile.size !== newFile.size ||
    existingFile.type !== newFile.type;
