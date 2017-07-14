import {
  VOTERS_REQUEST_DISTRICT_VOTERS_BEGIN,
  VOTERS_REQUEST_DISTRICT_VOTERS_SUCCESS,
  VOTERS_REQUEST_DISTRICT_VOTERS_FAILURE,
  VOTERS_REQUEST_DISTRICT_VOTERS_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function requestDistrictVoters(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: VOTERS_REQUEST_DISTRICT_VOTERS_BEGIN,
    });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a sample which resolves promise in 20ms. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
      const doRequest = new Promise((resolve2, reject2) => {
        fetch(`http://datashark.us-west-1.elasticbeanstalk.com/api/voters/district/${args.district}`).then( resp => {
          resolve2(resp.json())
        }, resp => {
          reject2(resp)
        })
      })
      doRequest.then(
        (res) => {
          dispatch({
            type: VOTERS_REQUEST_DISTRICT_VOTERS_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: VOTERS_REQUEST_DISTRICT_VOTERS_FAILURE,
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
export function dismissRequestDistrictVotersError() {
  return {
    type: VOTERS_REQUEST_DISTRICT_VOTERS_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case VOTERS_REQUEST_DISTRICT_VOTERS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        requestDistrictVotersPending: true,
        requestDistrictVotersError: null,
      };

    case VOTERS_REQUEST_DISTRICT_VOTERS_SUCCESS:
      // The request is success
      return {
        ...state,
        voters: action.data,
        requestDistrictVotersPending: false,
        requestDistrictVotersError: null,
      };

    case VOTERS_REQUEST_DISTRICT_VOTERS_FAILURE:
      // The request is failed
      return {
        ...state,
        requestDistrictVotersPending: false,
        requestDistrictVotersError: action.data.error,
      };

    case VOTERS_REQUEST_DISTRICT_VOTERS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        requestDistrictVotersError: null,
      };

    default:
      return state;
  }
}
