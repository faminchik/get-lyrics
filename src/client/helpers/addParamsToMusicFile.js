import uuidv4 from 'uuid/v4';
import { getFileNameByFullName } from '../utils/filesNameUtils';

export default musicFile => {
    const { name: fileFullName = null, ...restData } = musicFile;
    const fileName = getFileNameByFullName(fileFullName);
    return {
        name: fileName,
        nameWithExtension: fileFullName,
        id: uuidv4(),
        setLyricsStatus: null,
        shouldSearchLyrics: true,
        ...restData
    };
};
