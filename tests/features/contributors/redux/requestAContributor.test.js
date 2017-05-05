import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  CONTRIBUTORS_REQUEST_A_CONTRIBUTOR_BEGIN,
  CONTRIBUTORS_REQUEST_A_CONTRIBUTOR_SUCCESS,
  CONTRIBUTORS_REQUEST_A_CONTRIBUTOR_FAILURE,
  CONTRIBUTORS_REQUEST_A_CONTRIBUTOR_DISMISS_ERROR,
} from 'src/features/contributors/redux/constants';

import {
  requestAContributor,
  dismissRequestAContributorError,
  reducer,
} from 'src/features/contributors/redux/requestAContributor';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('contributors/redux/requestAContributor', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when requestAContributor succeeds', () => {
    const store = mockStore({});

    return store.dispatch(requestAContributor())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', CONTRIBUTORS_REQUEST_A_CONTRIBUTOR_BEGIN);
        expect(actions[1]).to.have.property('type', CONTRIBUTORS_REQUEST_A_CONTRIBUTOR_SUCCESS);
      });
  });

  it('dispatches failure action when requestAContributor fails', () => {
    const store = mockStore({});

    return store.dispatch(requestAContributor({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', CONTRIBUTORS_REQUEST_A_CONTRIBUTOR_BEGIN);
        expect(actions[1]).to.have.property('type', CONTRIBUTORS_REQUEST_A_CONTRIBUTOR_FAILURE);
        expect(actions[1]).to.have.deep.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissRequestAContributorError', () => {
    const expectedAction = {
      type: CONTRIBUTORS_REQUEST_A_CONTRIBUTOR_DISMISS_ERROR,
    };
    expect(dismissRequestAContributorError()).to.deep.equal(expectedAction);
  });

  it('handles action type CONTRIBUTORS_REQUEST_A_CONTRIBUTOR_BEGIN correctly', () => {
    const prevState = { requestAContributorPending: false };
    const state = reducer(
      prevState,
      { type: CONTRIBUTORS_REQUEST_A_CONTRIBUTOR_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestAContributorPending).to.be.true;
  });

  it('handles action type CONTRIBUTORS_REQUEST_A_CONTRIBUTOR_SUCCESS correctly', () => {
    const prevState = { requestAContributorPending: true };
    const state = reducer(
      prevState,
      { type: CONTRIBUTORS_REQUEST_A_CONTRIBUTOR_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestAContributorPending).to.be.false;
  });

  it('handles action type CONTRIBUTORS_REQUEST_A_CONTRIBUTOR_FAILURE correctly', () => {
    const prevState = { requestAContributorPending: true };
    const state = reducer(
      prevState,
      { type: CONTRIBUTORS_REQUEST_A_CONTRIBUTOR_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestAContributorPending).to.be.false;
    expect(state.requestAContributorError).to.exist;
  });

  it('handles action type CONTRIBUTORS_REQUEST_A_CONTRIBUTOR_DISMISS_ERROR correctly', () => {
    const prevState = { requestAContributorError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: CONTRIBUTORS_REQUEST_A_CONTRIBUTOR_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestAContributorError).to.be.null;
  });
});
