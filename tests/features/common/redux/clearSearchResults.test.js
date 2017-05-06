import { expect } from 'chai';

import {
  COMMON_CLEAR_SEARCH_RESULTS,
} from 'src/features/common/redux/constants';

import {
  clearSearchResults,
  reducer,
} from 'src/features/common/redux/clearSearchResults';

describe('common/redux/clearSearchResults', () => {
  it('returns correct action by clearSearchResults', () => {
    expect(clearSearchResults()).to.have.property('type', COMMON_CLEAR_SEARCH_RESULTS);
  });

  it('handles action type COMMON_CLEAR_SEARCH_RESULTS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: COMMON_CLEAR_SEARCH_RESULTS }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
