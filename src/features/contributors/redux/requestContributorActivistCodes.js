import {
  CONTRIBUTORS_REQUEST_CONTRIBUTOR_ACTIVIST_CODES_BEGIN,
  CONTRIBUTORS_REQUEST_CONTRIBUTOR_ACTIVIST_CODES_SUCCESS,
  CONTRIBUTORS_REQUEST_CONTRIBUTOR_ACTIVIST_CODES_FAILURE,
  CONTRIBUTORS_REQUEST_CONTRIBUTOR_ACTIVIST_CODES_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function requestContributorActivistCodes(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: CONTRIBUTORS_REQUEST_CONTRIBUTOR_ACTIVIST_CODES_BEGIN,
    });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a sample which resolves promise in 20ms. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
        const doRequest = new Promise((resolve2, reject2) => {
            fetch(`http://openapoc.com/api/contributors/${args.id}/activist_codes`).then( resp => {
                resolve2(resp.json())
            }, resp => {
                reject2(resp)
            })
        });
      doRequest.then(
        (res) => {
          dispatch({
            type: CONTRIBUTORS_REQUEST_CONTRIBUTOR_ACTIVIST_CODES_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: CONTRIBUTORS_REQUEST_CONTRIBUTOR_ACTIVIST_CODES_FAILURE,
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
export function dismissRequestContributorActivistCodesError() {
  return {
    type: CONTRIBUTORS_REQUEST_CONTRIBUTOR_ACTIVIST_CODES_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CONTRIBUTORS_REQUEST_CONTRIBUTOR_ACTIVIST_CODES_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        requestContributorActivistCodesPending: true,
        requestContributorActivistCodesError: null,
      };

    case CONTRIBUTORS_REQUEST_CONTRIBUTOR_ACTIVIST_CODES_SUCCESS:
      // The request is success
      return {
        ...state,
        activist_codes: action.data,
        requestContributorActivistCodesPending: false,
        requestContributorActivistCodesError: null,
      };

    case CONTRIBUTORS_REQUEST_CONTRIBUTOR_ACTIVIST_CODES_FAILURE:
      // The request is failed
      return {
        ...state,
        requestContributorActivistCodesPending: false,
        requestContributorActivistCodesError: action.data.error,
      };

    case CONTRIBUTORS_REQUEST_CONTRIBUTOR_ACTIVIST_CODES_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        requestContributorActivistCodesError: null,
      };

    default:
      return state;
  }
}
