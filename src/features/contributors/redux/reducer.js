import initialState from './initialState';
import { reducer as requestAContributorReducer } from './requestAContributor';
import { reducer as requestContributorsReducer } from './requestContributors';
import { reducer as clearContributorsReducer } from './clearContributors';
import { reducer as requestContributorActivistCodesReducer } from './requestContributorActivistCodes';

const reducers = [
  requestAContributorReducer,
  requestContributorsReducer,
  clearContributorsReducer,
  requestContributorActivistCodesReducer,
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
