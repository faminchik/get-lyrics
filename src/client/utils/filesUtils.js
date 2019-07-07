import _ from 'lodash';

export const convertFileToObject = file => {
    const { name, type, size, lastModified, path = null, preview, webkitRelativePath } = file;
    return { name, path, type, lastModified, size, preview, webkitRelativePath };
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
    existingFile.path !== newFile.path ||
    existingFile.size !== newFile.size ||
    existingFile.type !== newFile.type;
