import {
  COMMON_REQUEST_SEARCH_BEGIN,
  COMMON_REQUEST_SEARCH_SUCCESS,
  COMMON_REQUEST_SEARCH_FAILURE,
  COMMON_REQUEST_SEARCH_DISMISS_ERROR,
} from './constants';
import $ from 'jquery';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function requestSearch(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: COMMON_REQUEST_SEARCH_BEGIN,
    });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a sample which resolves promise in 20ms. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
      const doRequest = new Promise((resolve2, reject2) => {
        fetch(`http://lowcost-env.ap4kzccr7q.us-west-1.elasticbeanstalk.com/api/${args.model}/search?` + $.param(args)).then(resp => {
          resolve2(resp.json())
        }, () => reject2())
      });
      doRequest.then(
        (res) => {
          dispatch({
            type: COMMON_REQUEST_SEARCH_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: COMMON_REQUEST_SEARCH_FAILURE,
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
export function dismissRequestSearchError() {
  return {
    type: COMMON_REQUEST_SEARCH_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_REQUEST_SEARCH_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loading: true,
        requestSearchPending: true,
        requestSearchError: null,
      };

    case COMMON_REQUEST_SEARCH_SUCCESS:
      // The request is success
      if(action.data[0].formSubmit){
        return {
          ...state,
          contributors: action.data,
          loading: false,
          results: [],
          requestSearchPending: false,
          requestSearchError: null,
          submitted: false
        };
      } else {
        return {
          ...state,
          results: action.data,
          contributors: [{
            id: 0,
            full_name: 'No Results',
            score: '-1'
          }],
          loading: false,
          requestSearchPending: false,
          requestSearchError: null,
        };
      }

    case COMMON_REQUEST_SEARCH_FAILURE:
      // The request is failed
      return {
        ...state,
        requestSearchPending: false,
        requestSearchError: action.data.error,
      };

    case COMMON_REQUEST_SEARCH_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        requestSearchError: null,
      };

    default:
      return state;
  }
}
