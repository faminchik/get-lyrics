import { combineReducers } from 'redux';
import musicFilesReducer from './musicFilesReducer';
import loadingReducer from './loadingReducer';
import dropzoneReducer from './dropzoneReducer';

const rootReducer = combineReducers({
    musicFiles: musicFilesReducer,
    loading: loadingReducer,
    dropzone: dropzoneReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
