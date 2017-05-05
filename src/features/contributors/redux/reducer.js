import initialState from './initialState';
import { reducer as requestAContributorReducer } from './requestAContributor';
import { reducer as requestContributorsReducer } from './requestContributors';

const reducers = [
  requestAContributorReducer,
  requestContributorsReducer,
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
