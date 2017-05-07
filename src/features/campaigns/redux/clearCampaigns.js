import {
  CAMPAIGNS_CLEAR_CAMPAIGNS,
} from './constants';

export function clearCampaigns() {
  return {
    type: CAMPAIGNS_CLEAR_CAMPAIGNS,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CAMPAIGNS_CLEAR_CAMPAIGNS:
      return {
        ...state,
        contributions: [],
        info: {},
        loading: true
      };

    default:
      return state;
  }
}
