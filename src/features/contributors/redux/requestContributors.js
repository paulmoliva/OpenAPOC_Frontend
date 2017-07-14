import {
  CONTRIBUTORS_REQUEST_CONTRIBUTORS_BEGIN,
  CONTRIBUTORS_REQUEST_CONTRIBUTORS_SUCCESS,
  CONTRIBUTORS_REQUEST_CONTRIBUTORS_FAILURE,
  CONTRIBUTORS_REQUEST_CONTRIBUTORS_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function requestContributors(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: CONTRIBUTORS_REQUEST_CONTRIBUTORS_BEGIN,
    });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a sample which resolves promise in 20ms. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
      const doRequest = new Promise((resolve2, reject2) => {
          fetch('http://datashark2.us-west-1.elasticbeanstalk.com/api/contributors').then((resp) => {resolve2(resp.json())}, reject2)
      });
      doRequest.then(
        (res) => {
          dispatch({
            type: CONTRIBUTORS_REQUEST_CONTRIBUTORS_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: CONTRIBUTORS_REQUEST_CONTRIBUTORS_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissRequestContributorsError() {
  return {
    type: CONTRIBUTORS_REQUEST_CONTRIBUTORS_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CONTRIBUTORS_REQUEST_CONTRIBUTORS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        requestContributorsPending: true,
        requestContributorsError: null,
      };

    case CONTRIBUTORS_REQUEST_CONTRIBUTORS_SUCCESS:
      // The request is success
      return {
        ...state,
        contributors: action.data,
        requestContributorsPending: false,
        requestContributorsError: null,
      };

    case CONTRIBUTORS_REQUEST_CONTRIBUTORS_FAILURE:
      // The request is failed
      return {
        ...state,
        requestContributorsPending: false,
        requestContributorsError: action.data.error,
      };

    case CONTRIBUTORS_REQUEST_CONTRIBUTORS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        requestContributorsError: null,
      };

    default:
      return state;
  }
}
