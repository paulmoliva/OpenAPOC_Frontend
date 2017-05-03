import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  CAMPAIGNS_REQUEST_CAMPAIGNS_BEGIN,
  CAMPAIGNS_REQUEST_CAMPAIGNS_SUCCESS,
  CAMPAIGNS_REQUEST_CAMPAIGNS_FAILURE,
  CAMPAIGNS_REQUEST_CAMPAIGNS_DISMISS_ERROR,
} from 'src/features/campaigns/redux/constants';

import {
  requestCampaigns,
  dismissRequestCampaignsError,
  reducer,
} from 'src/features/campaigns/redux/requestCampaigns';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('campaigns/redux/requestCampaigns', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when requestCampaigns succeeds', () => {
    const store = mockStore({});

    return store.dispatch(requestCampaigns())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', CAMPAIGNS_REQUEST_CAMPAIGNS_BEGIN);
        expect(actions[1]).to.have.property('type', CAMPAIGNS_REQUEST_CAMPAIGNS_SUCCESS);
      });
  });

  it('dispatches failure action when requestCampaigns fails', () => {
    const store = mockStore({});

    return store.dispatch(requestCampaigns({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', CAMPAIGNS_REQUEST_CAMPAIGNS_BEGIN);
        expect(actions[1]).to.have.property('type', CAMPAIGNS_REQUEST_CAMPAIGNS_FAILURE);
        expect(actions[1]).to.have.deep.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissRequestCampaignsError', () => {
    const expectedAction = {
      type: CAMPAIGNS_REQUEST_CAMPAIGNS_DISMISS_ERROR,
    };
    expect(dismissRequestCampaignsError()).to.deep.equal(expectedAction);
  });

  it('handles action type CAMPAIGNS_REQUEST_CAMPAIGNS_BEGIN correctly', () => {
    const prevState = { requestCampaignsPending: false };
    const state = reducer(
      prevState,
      { type: CAMPAIGNS_REQUEST_CAMPAIGNS_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestCampaignsPending).to.be.true;
  });

  it('handles action type CAMPAIGNS_REQUEST_CAMPAIGNS_SUCCESS correctly', () => {
    const prevState = { requestCampaignsPending: true };
    const state = reducer(
      prevState,
      { type: CAMPAIGNS_REQUEST_CAMPAIGNS_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestCampaignsPending).to.be.false;
  });

  it('handles action type CAMPAIGNS_REQUEST_CAMPAIGNS_FAILURE correctly', () => {
    const prevState = { requestCampaignsPending: true };
    const state = reducer(
      prevState,
      { type: CAMPAIGNS_REQUEST_CAMPAIGNS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestCampaignsPending).to.be.false;
    expect(state.requestCampaignsError).to.exist;
  });

  it('handles action type CAMPAIGNS_REQUEST_CAMPAIGNS_DISMISS_ERROR correctly', () => {
    const prevState = { requestCampaignsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: CAMPAIGNS_REQUEST_CAMPAIGNS_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestCampaignsError).to.be.null;
  });
});
