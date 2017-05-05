import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  CONTRIBUTORS_REQUEST_CONTRIBUTORS_BEGIN,
  CONTRIBUTORS_REQUEST_CONTRIBUTORS_SUCCESS,
  CONTRIBUTORS_REQUEST_CONTRIBUTORS_FAILURE,
  CONTRIBUTORS_REQUEST_CONTRIBUTORS_DISMISS_ERROR,
} from 'src/features/contributors/redux/constants';

import {
  requestContributors,
  dismissRequestContributorsError,
  reducer,
} from 'src/features/contributors/redux/requestContributors';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('contributors/redux/requestContributors', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when requestContributors succeeds', () => {
    const store = mockStore({});

    return store.dispatch(requestContributors())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', CONTRIBUTORS_REQUEST_CONTRIBUTORS_BEGIN);
        expect(actions[1]).to.have.property('type', CONTRIBUTORS_REQUEST_CONTRIBUTORS_SUCCESS);
      });
  });

  it('dispatches failure action when requestContributors fails', () => {
    const store = mockStore({});

    return store.dispatch(requestContributors({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', CONTRIBUTORS_REQUEST_CONTRIBUTORS_BEGIN);
        expect(actions[1]).to.have.property('type', CONTRIBUTORS_REQUEST_CONTRIBUTORS_FAILURE);
        expect(actions[1]).to.have.deep.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissRequestContributorsError', () => {
    const expectedAction = {
      type: CONTRIBUTORS_REQUEST_CONTRIBUTORS_DISMISS_ERROR,
    };
    expect(dismissRequestContributorsError()).to.deep.equal(expectedAction);
  });

  it('handles action type CONTRIBUTORS_REQUEST_CONTRIBUTORS_BEGIN correctly', () => {
    const prevState = { requestContributorsPending: false };
    const state = reducer(
      prevState,
      { type: CONTRIBUTORS_REQUEST_CONTRIBUTORS_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestContributorsPending).to.be.true;
  });

  it('handles action type CONTRIBUTORS_REQUEST_CONTRIBUTORS_SUCCESS correctly', () => {
    const prevState = { requestContributorsPending: true };
    const state = reducer(
      prevState,
      { type: CONTRIBUTORS_REQUEST_CONTRIBUTORS_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestContributorsPending).to.be.false;
  });

  it('handles action type CONTRIBUTORS_REQUEST_CONTRIBUTORS_FAILURE correctly', () => {
    const prevState = { requestContributorsPending: true };
    const state = reducer(
      prevState,
      { type: CONTRIBUTORS_REQUEST_CONTRIBUTORS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestContributorsPending).to.be.false;
    expect(state.requestContributorsError).to.exist;
  });

  it('handles action type CONTRIBUTORS_REQUEST_CONTRIBUTORS_DISMISS_ERROR correctly', () => {
    const prevState = { requestContributorsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: CONTRIBUTORS_REQUEST_CONTRIBUTORS_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestContributorsError).to.be.null;
  });
});
