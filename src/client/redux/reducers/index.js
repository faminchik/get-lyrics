import { combineReducers } from 'redux';
import musicFilesReducer from './musicFilesReducer';
import loadingReducer from './loadingReducer';

export default combineReducers({
    musicFiles: musicFilesReducer,
    loading: loadingReducer
});
