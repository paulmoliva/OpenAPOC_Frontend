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
      debugger;
      return {
        ...state,
        campaigns: {donors: [], loading: true},

      };

    default:
      return state;
  }
}
