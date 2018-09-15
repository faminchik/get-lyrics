import { combineReducers } from 'redux';
import musicFiles from './musicFiles.reducer';
import loadingStatus from './loadingStatus.reducer';

export default combineReducers({
    musicFiles,
    loadingStatus
});
