import { combineReducers } from 'redux';
import musicFilesReducer from './musicFilesReducer';
import loadingReducer from './loadingReducer';
import dropzoneReducer from './dropzoneReducer';

export default combineReducers({
    musicFiles: musicFilesReducer,
    loading: loadingReducer,
    dropzone: dropzoneReducer
});
