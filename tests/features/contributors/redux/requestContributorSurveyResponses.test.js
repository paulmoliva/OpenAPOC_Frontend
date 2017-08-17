import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  CONTRIBUTORS_REQUEST_CONTRIBUTOR_SURVEY_RESPONSES_BEGIN,
  CONTRIBUTORS_REQUEST_CONTRIBUTOR_SURVEY_RESPONSES_SUCCESS,
  CONTRIBUTORS_REQUEST_CONTRIBUTOR_SURVEY_RESPONSES_FAILURE,
  CONTRIBUTORS_REQUEST_CONTRIBUTOR_SURVEY_RESPONSES_DISMISS_ERROR,
} from 'src/features/contributors/redux/constants';

import {
  requestContributorSurveyResponses,
  dismissRequestContributorSurveyResponsesError,
  reducer,
} from 'src/features/contributors/redux/requestContributorSurveyResponses';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('contributors/redux/requestContributorSurveyResponses', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when requestContributorSurveyResponses succeeds', () => {
    const store = mockStore({});

    return store.dispatch(requestContributorSurveyResponses())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', CONTRIBUTORS_REQUEST_CONTRIBUTOR_SURVEY_RESPONSES_BEGIN);
        expect(actions[1]).to.have.property('type', CONTRIBUTORS_REQUEST_CONTRIBUTOR_SURVEY_RESPONSES_SUCCESS);
      });
  });

  it('dispatches failure action when requestContributorSurveyResponses fails', () => {
    const store = mockStore({});

    return store.dispatch(requestContributorSurveyResponses({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', CONTRIBUTORS_REQUEST_CONTRIBUTOR_SURVEY_RESPONSES_BEGIN);
        expect(actions[1]).to.have.property('type', CONTRIBUTORS_REQUEST_CONTRIBUTOR_SURVEY_RESPONSES_FAILURE);
        expect(actions[1]).to.have.deep.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissRequestContributorSurveyResponsesError', () => {
    const expectedAction = {
      type: CONTRIBUTORS_REQUEST_CONTRIBUTOR_SURVEY_RESPONSES_DISMISS_ERROR,
    };
    expect(dismissRequestContributorSurveyResponsesError()).to.deep.equal(expectedAction);
  });

  it('handles action type CONTRIBUTORS_REQUEST_CONTRIBUTOR_SURVEY_RESPONSES_BEGIN correctly', () => {
    const prevState = { requestContributorSurveyResponsesPending: false };
    const state = reducer(
      prevState,
      { type: CONTRIBUTORS_REQUEST_CONTRIBUTOR_SURVEY_RESPONSES_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestContributorSurveyResponsesPending).to.be.true;
  });

  it('handles action type CONTRIBUTORS_REQUEST_CONTRIBUTOR_SURVEY_RESPONSES_SUCCESS correctly', () => {
    const prevState = { requestContributorSurveyResponsesPending: true };
    const state = reducer(
      prevState,
      { type: CONTRIBUTORS_REQUEST_CONTRIBUTOR_SURVEY_RESPONSES_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestContributorSurveyResponsesPending).to.be.false;
  });

  it('handles action type CONTRIBUTORS_REQUEST_CONTRIBUTOR_SURVEY_RESPONSES_FAILURE correctly', () => {
    const prevState = { requestContributorSurveyResponsesPending: true };
    const state = reducer(
      prevState,
      { type: CONTRIBUTORS_REQUEST_CONTRIBUTOR_SURVEY_RESPONSES_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestContributorSurveyResponsesPending).to.be.false;
    expect(state.requestContributorSurveyResponsesError).to.exist;
  });

  it('handles action type CONTRIBUTORS_REQUEST_CONTRIBUTOR_SURVEY_RESPONSES_DISMISS_ERROR correctly', () => {
    const prevState = { requestContributorSurveyResponsesError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: CONTRIBUTORS_REQUEST_CONTRIBUTOR_SURVEY_RESPONSES_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.requestContributorSurveyResponsesError).to.be.null;
  });
});
