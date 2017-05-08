import {
  COMMON_CLEAR_SEARCH_RESULTS,
} from './constants';

export function clearSearchResults() {
  return {
    type: COMMON_CLEAR_SEARCH_RESULTS,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_CLEAR_SEARCH_RESULTS:
      return {
        ...state,
        results: [],
        contributors: [{
          id: 0,
          full_name: 'No Results',
          score: '-1'
        }]
      };

    default:
      return state;
  }
}
