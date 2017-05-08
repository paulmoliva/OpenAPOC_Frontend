const initialState = {
  requestSearchPending: false,
  requestSearchError: null,
  results: [],
  contributors: [{
    id: 0,
    full_name: 'No Results',
    score: '-1'
  }]
};

export default initialState;
