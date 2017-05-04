import {
  DefaultPage,
  CampaignPage,
} from './';

export default {
  path: 'campaigns',
  name: 'Campaigns',
  childRoutes: [
    { path: 'default-page', name: 'Default page', component: DefaultPage, isIndex: true },
    { path: ':campaignID', name: 'Campaign page', component: CampaignPage },
  ],
};
