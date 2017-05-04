import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  CAMPAIGNS_REQUEST_A_CAMPAIGN_BEGIN,
  CAMPAIGNS_REQUEST_A_CAMPAIGN_SUCCESS,
  CAMPAIGNS_REQUEST_A_CAMPAIGN_FAILURE,
  CAMPAIGNS_REQUEST_A_CAMPAIGN_DISMISS_ERROR,
} from 'src/features/campaigns/redux/constants';

import {
  requestACampaign,
  dismissRequestACampaignError,
  reducer,
} from 'src/features/campaigns/redux/requestACampaign';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('campaigns/redux/requestACampaign', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when requestACampaign succeeds', () => {
    const store = mockStore({});

    return store.dispatch(requestACampaign())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', CAMPAIGNS_REQUEST_A_CAMPAIGN_BEGIN);
        expect(actions[1]).to.have.property('type', CAMPAIGNS_REQUEST_A_CAMPAIGN_SUCCESS);
      });
  });

  it('dispatches failure action when requestACampaign fails', () => {
    const store = mockStore({});

    return store.dispatch(requestACampaign({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', CAMPAIGNS_REQUEST_A_CAMPAIGN_BEGIN);
        expect(actions[1]).to.have.property('type', CAMPAIGNS_REQUEST_A_CAMPAIGN_FAILURE);
        expect(actions[1]).to.have.deep.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissRequestACampaignError', () => {
    const expectedAction = {
      type: CAMPAIGNS_REQUEST_A_CAMPAIGN_DISMISS_ERROR,
    };
    expect(dismissRequestACampaignError()).to.deep.equal(expectedAction);
  });

  it('handles action type CAMPAIGNS_REQUEST_A_CAMPAIGN_BEGIN correctly', () => {
    const prevState = { requestACampaignPending: false };
    const state = reducer(
      prevState,
      { type: CAMPAIGNS_REQUEST_A_CAMPAIGN_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestACampaignPending).to.be.true;
  });

  it('handles action type CAMPAIGNS_REQUEST_A_CAMPAIGN_SUCCESS correctly', () => {
    const prevState = { requestACampaignPending: true };
    const state = reducer(
      prevState,
      { type: CAMPAIGNS_REQUEST_A_CAMPAIGN_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestACampaignPending).to.be.false;
  });

  it('handles action type CAMPAIGNS_REQUEST_A_CAMPAIGN_FAILURE correctly', () => {
    const prevState = { requestACampaignPending: true };
    const state = reducer(
      prevState,
      { type: CAMPAIGNS_REQUEST_A_CAMPAIGN_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestACampaignPending).to.be.false;
    expect(state.requestACampaignError).to.exist;
  });

  it('handles action type CAMPAIGNS_REQUEST_A_CAMPAIGN_DISMISS_ERROR correctly', () => {
    const prevState = { requestACampaignError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: CAMPAIGNS_REQUEST_A_CAMPAIGN_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestACampaignError).to.be.null;
  });
});
