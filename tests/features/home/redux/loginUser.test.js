import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  HOME_LOGIN_USER_BEGIN,
  HOME_LOGIN_USER_SUCCESS,
  HOME_LOGIN_USER_FAILURE,
  HOME_LOGIN_USER_DISMISS_ERROR,
} from 'src/features/home/redux/constants';

import {
  loginUser,
  dismissLoginUserError,
  reducer,
} from 'src/features/home/redux/loginUser';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/loginUser', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when loginUser succeeds', () => {
    const store = mockStore({});

    return store.dispatch(loginUser())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', HOME_LOGIN_USER_BEGIN);
        expect(actions[1]).to.have.property('type', HOME_LOGIN_USER_SUCCESS);
      });
  });

  it('dispatches failure action when loginUser fails', () => {
    const store = mockStore({});

    return store.dispatch(loginUser({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', HOME_LOGIN_USER_BEGIN);
        expect(actions[1]).to.have.property('type', HOME_LOGIN_USER_FAILURE);
        expect(actions[1]).to.have.deep.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissLoginUserError', () => {
    const expectedAction = {
      type: HOME_LOGIN_USER_DISMISS_ERROR,
    };
    expect(dismissLoginUserError()).to.deep.equal(expectedAction);
  });

  it('handles action type HOME_LOGIN_USER_BEGIN correctly', () => {
    const prevState = { loginUserPending: false };
    const state = reducer(
      prevState,
      { type: HOME_LOGIN_USER_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.loginUserPending).to.be.true;
  });

  it('handles action type HOME_LOGIN_USER_SUCCESS correctly', () => {
    const prevState = { loginUserPending: true };
    const state = reducer(
      prevState,
      { type: HOME_LOGIN_USER_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.loginUserPending).to.be.false;
  });

  it('handles action type HOME_LOGIN_USER_FAILURE correctly', () => {
    const prevState = { loginUserPending: true };
    const state = reducer(
      prevState,
      { type: HOME_LOGIN_USER_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.loginUserPending).to.be.false;
    expect(state.loginUserError).to.exist;
  });

  it('handles action type HOME_LOGIN_USER_DISMISS_ERROR correctly', () => {
    const prevState = { loginUserError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_LOGIN_USER_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.loginUserError).to.be.null;
  });
});
