import _ from 'lodash';

export default (files, newFiles) => {
    const newUniqueFiles = [];

    if (_.isNil(files) || _.isNil(newFiles)) return [];
    if (_.isEmpty(newFiles)) return [];
    if (_.isEmpty(files)) return newFiles;

    _.forEach(newFiles, newFile => {
        let isUnique = true;
        _.forEach(files, file => {
            if (!isNewFileUnique(file, newFile)) {
                isUnique = false;
            }
        });
        if (isUnique) newUniqueFiles.push(newFile);
    });

    return newUniqueFiles;
};

const isNewFileUnique = (file, newFile) => {
    return (
        file.lastModified !== newFile.lastModified ||
        file.path !== newFile.path ||
        file.size !== newFile.size ||
        file.type !== newFile.type
    );
};
