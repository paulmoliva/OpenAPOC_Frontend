import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  CONTRIBUTORS_REQUEST_CONTRIBUTOR_ACTIVIST_CODES_BEGIN,
  CONTRIBUTORS_REQUEST_CONTRIBUTOR_ACTIVIST_CODES_SUCCESS,
  CONTRIBUTORS_REQUEST_CONTRIBUTOR_ACTIVIST_CODES_FAILURE,
  CONTRIBUTORS_REQUEST_CONTRIBUTOR_ACTIVIST_CODES_DISMISS_ERROR,
} from 'src/features/contributors/redux/constants';

import {
  requestContributorActivistCodes,
  dismissRequestContributorActivistCodesError,
  reducer,
} from 'src/features/contributors/redux/requestContributorActivistCodes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('contributors/redux/requestContributorActivistCodes', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when requestContributorActivistCodes succeeds', () => {
    const store = mockStore({});

    return store.dispatch(requestContributorActivistCodes())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', CONTRIBUTORS_REQUEST_CONTRIBUTOR_ACTIVIST_CODES_BEGIN);
        expect(actions[1]).to.have.property('type', CONTRIBUTORS_REQUEST_CONTRIBUTOR_ACTIVIST_CODES_SUCCESS);
      });
  });

  it('dispatches failure action when requestContributorActivistCodes fails', () => {
    const store = mockStore({});

    return store.dispatch(requestContributorActivistCodes({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', CONTRIBUTORS_REQUEST_CONTRIBUTOR_ACTIVIST_CODES_BEGIN);
        expect(actions[1]).to.have.property('type', CONTRIBUTORS_REQUEST_CONTRIBUTOR_ACTIVIST_CODES_FAILURE);
        expect(actions[1]).to.have.deep.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissRequestContributorActivistCodesError', () => {
    const expectedAction = {
      type: CONTRIBUTORS_REQUEST_CONTRIBUTOR_ACTIVIST_CODES_DISMISS_ERROR,
    };
    expect(dismissRequestContributorActivistCodesError()).to.deep.equal(expectedAction);
  });

  it('handles action type CONTRIBUTORS_REQUEST_CONTRIBUTOR_ACTIVIST_CODES_BEGIN correctly', () => {
    const prevState = { requestContributorActivistCodesPending: false };
    const state = reducer(
      prevState,
      { type: CONTRIBUTORS_REQUEST_CONTRIBUTOR_ACTIVIST_CODES_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestContributorActivistCodesPending).to.be.true;
  });

  it('handles action type CONTRIBUTORS_REQUEST_CONTRIBUTOR_ACTIVIST_CODES_SUCCESS correctly', () => {
    const prevState = { requestContributorActivistCodesPending: true };
    const state = reducer(
      prevState,
      { type: CONTRIBUTORS_REQUEST_CONTRIBUTOR_ACTIVIST_CODES_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestContributorActivistCodesPending).to.be.false;
  });

  it('handles action type CONTRIBUTORS_REQUEST_CONTRIBUTOR_ACTIVIST_CODES_FAILURE correctly', () => {
    const prevState = { requestContributorActivistCodesPending: true };
    const state = reducer(
      prevState,
      { type: CONTRIBUTORS_REQUEST_CONTRIBUTOR_ACTIVIST_CODES_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestContributorActivistCodesPending).to.be.false;
    expect(state.requestContributorActivistCodesError).to.exist;
  });

  it('handles action type CONTRIBUTORS_REQUEST_CONTRIBUTOR_ACTIVIST_CODES_DISMISS_ERROR correctly', () => {
    const prevState = { requestContributorActivistCodesError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: CONTRIBUTORS_REQUEST_CONTRIBUTOR_ACTIVIST_CODES_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestContributorActivistCodesError).to.be.null;
  });
});
