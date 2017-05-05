import { expect } from 'chai';

import {
  CAMPAIGNS_CLEAR_CAMPAIGNS,
} from 'src/features/campaigns/redux/constants';

import {
  clearCampaigns,
  reducer,
} from 'src/features/campaigns/redux/clearCampaigns';

describe('campaigns/redux/clearCampaigns', () => {
  it('returns correct action by clearCampaigns', () => {
    expect(clearCampaigns()).to.have.property('type', CAMPAIGNS_CLEAR_CAMPAIGNS);
  });

  it('handles action type CAMPAIGNS_CLEAR_CAMPAIGNS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: CAMPAIGNS_CLEAR_CAMPAIGNS }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state).to.deep.equal(prevState); // TODO: replace this line with real case.
  });
});
