import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import homeReducer from '../features/home/redux/reducer';
import commonReducer from '../features/common/redux/reducer';
import campaignsReducer from '../features/campaigns/redux/reducer';
import usersReducer from '../features/users/redux/reducer';
import contributorsReducer from '../features/contributors/redux/reducer';

// NOTE 1: DO NOT CHANGE the 'reducerMap' name and the declaration pattern.
// This is used for Rekit cmds to register new features, remove features, etc.

// NOTE 2: always use the camel case of the feature folder name as the store branch name
// So that it's easy for others to understand it and Rekit could manage theme.

const reducerMap = {
  routing: routerReducer,
  home: homeReducer,
  common: commonReducer,
  campaigns: campaignsReducer,
  users: usersReducer,
  contributors: contributorsReducer,
};

export default combineReducers(reducerMap);
