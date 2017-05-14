import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  VOTERS_REQUEST_DISTRICT_VOTERS_BEGIN,
  VOTERS_REQUEST_DISTRICT_VOTERS_SUCCESS,
  VOTERS_REQUEST_DISTRICT_VOTERS_FAILURE,
  VOTERS_REQUEST_DISTRICT_VOTERS_DISMISS_ERROR,
} from 'src/features/voters/redux/constants';

import {
  requestDistrictVoters,
  dismissRequestDistrictVotersError,
  reducer,
} from 'src/features/voters/redux/requestDistrictVoters';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('voters/redux/requestDistrictVoters', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when requestDistrictVoters succeeds', () => {
    const store = mockStore({});

    return store.dispatch(requestDistrictVoters())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', VOTERS_REQUEST_DISTRICT_VOTERS_BEGIN);
        expect(actions[1]).to.have.property('type', VOTERS_REQUEST_DISTRICT_VOTERS_SUCCESS);
      });
  });

  it('dispatches failure action when requestDistrictVoters fails', () => {
    const store = mockStore({});

    return store.dispatch(requestDistrictVoters({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', VOTERS_REQUEST_DISTRICT_VOTERS_BEGIN);
        expect(actions[1]).to.have.property('type', VOTERS_REQUEST_DISTRICT_VOTERS_FAILURE);
        expect(actions[1]).to.have.deep.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissRequestDistrictVotersError', () => {
    const expectedAction = {
      type: VOTERS_REQUEST_DISTRICT_VOTERS_DISMISS_ERROR,
    };
    expect(dismissRequestDistrictVotersError()).to.deep.equal(expectedAction);
  });

  it('handles action type VOTERS_REQUEST_DISTRICT_VOTERS_BEGIN correctly', () => {
    const prevState = { requestDistrictVotersPending: false };
    const state = reducer(
      prevState,
      { type: VOTERS_REQUEST_DISTRICT_VOTERS_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestDistrictVotersPending).to.be.true;
  });

  it('handles action type VOTERS_REQUEST_DISTRICT_VOTERS_SUCCESS correctly', () => {
    const prevState = { requestDistrictVotersPending: true };
    const state = reducer(
      prevState,
      { type: VOTERS_REQUEST_DISTRICT_VOTERS_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestDistrictVotersPending).to.be.false;
  });

  it('handles action type VOTERS_REQUEST_DISTRICT_VOTERS_FAILURE correctly', () => {
    const prevState = { requestDistrictVotersPending: true };
    const state = reducer(
      prevState,
      { type: VOTERS_REQUEST_DISTRICT_VOTERS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestDistrictVotersPending).to.be.false;
    expect(state.requestDistrictVotersError).to.exist;
  });

  it('handles action type VOTERS_REQUEST_DISTRICT_VOTERS_DISMISS_ERROR correctly', () => {
    const prevState = { requestDistrictVotersError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: VOTERS_REQUEST_DISTRICT_VOTERS_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestDistrictVotersError).to.be.null;
  });
});
