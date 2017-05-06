import { expect } from 'chai';

import {
  CONTRIBUTORS_CLEAR_CONTRIBUTORS,
} from 'src/features/contributors/redux/constants';

import {
  clearContributors,
  reducer,
} from 'src/features/contributors/redux/clearContributors';

describe('contributors/redux/clearContributors', () => {
  it('returns correct action by clearContributors', () => {
    expect(clearContributors()).to.have.property('type', CONTRIBUTORS_CLEAR_CONTRIBUTORS);
  });

  it('handles action type CONTRIBUTORS_CLEAR_CONTRIBUTORS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: CONTRIBUTORS_CLEAR_CONTRIBUTORS }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
