import {
  CONTRIBUTORS_CLEAR_CONTRIBUTORS,
} from './constants';

export function clearContributors() {
  return {
    type: CONTRIBUTORS_CLEAR_CONTRIBUTORS,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CONTRIBUTORS_CLEAR_CONTRIBUTORS:
      return {
        contributor: null,
        contributors: [],
        ...state,
      };

    default:
      return state;
  }
}
