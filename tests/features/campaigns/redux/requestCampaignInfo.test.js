import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  CAMPAIGNS_REQUEST_CAMPAIGN_INFO_BEGIN,
  CAMPAIGNS_REQUEST_CAMPAIGN_INFO_SUCCESS,
  CAMPAIGNS_REQUEST_CAMPAIGN_INFO_FAILURE,
  CAMPAIGNS_REQUEST_CAMPAIGN_INFO_DISMISS_ERROR,
} from 'src/features/campaigns/redux/constants';

import {
  requestCampaignInfo,
  dismissRequestCampaignInfoError,
  reducer,
} from 'src/features/campaigns/redux/requestCampaignInfo';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('campaigns/redux/requestCampaignInfo', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when requestCampaignInfo succeeds', () => {
    const store = mockStore({});

    return store.dispatch(requestCampaignInfo())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', CAMPAIGNS_REQUEST_CAMPAIGN_INFO_BEGIN);
        expect(actions[1]).to.have.property('type', CAMPAIGNS_REQUEST_CAMPAIGN_INFO_SUCCESS);
      });
  });

  it('dispatches failure action when requestCampaignInfo fails', () => {
    const store = mockStore({});

    return store.dispatch(requestCampaignInfo({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', CAMPAIGNS_REQUEST_CAMPAIGN_INFO_BEGIN);
        expect(actions[1]).to.have.property('type', CAMPAIGNS_REQUEST_CAMPAIGN_INFO_FAILURE);
        expect(actions[1]).to.have.deep.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissRequestCampaignInfoError', () => {
    const expectedAction = {
      type: CAMPAIGNS_REQUEST_CAMPAIGN_INFO_DISMISS_ERROR,
    };
    expect(dismissRequestCampaignInfoError()).to.deep.equal(expectedAction);
  });

  it('handles action type CAMPAIGNS_REQUEST_CAMPAIGN_INFO_BEGIN correctly', () => {
    const prevState = { requestCampaignInfoPending: false };
    const state = reducer(
      prevState,
      { type: CAMPAIGNS_REQUEST_CAMPAIGN_INFO_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestCampaignInfoPending).to.be.true;
  });

  it('handles action type CAMPAIGNS_REQUEST_CAMPAIGN_INFO_SUCCESS correctly', () => {
    const prevState = { requestCampaignInfoPending: true };
    const state = reducer(
      prevState,
      { type: CAMPAIGNS_REQUEST_CAMPAIGN_INFO_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestCampaignInfoPending).to.be.false;
  });

  it('handles action type CAMPAIGNS_REQUEST_CAMPAIGN_INFO_FAILURE correctly', () => {
    const prevState = { requestCampaignInfoPending: true };
    const state = reducer(
      prevState,
      { type: CAMPAIGNS_REQUEST_CAMPAIGN_INFO_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestCampaignInfoPending).to.be.false;
    expect(state.requestCampaignInfoError).to.exist;
  });

  it('handles action type CAMPAIGNS_REQUEST_CAMPAIGN_INFO_DISMISS_ERROR correctly', () => {
    const prevState = { requestCampaignInfoError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: CAMPAIGNS_REQUEST_CAMPAIGN_INFO_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestCampaignInfoError).to.be.null;
  });
});
