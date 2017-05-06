import initialState from './initialState';
import { reducer as requestSearchReducer } from './requestSearch';
import { reducer as clearSearchResultsReducer } from './clearSearchResults';

const reducers = [
  requestSearchReducer,
  clearSearchResultsReducer,
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // Handle cross-topic actions here
    default:
      newState = state;
      break;
  }
  return reducers.reduce((s, r) => r(s, action), newState);
}
