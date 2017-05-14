import {
  DefaultPage,
  DistrictPage,
} from './';

export default {
  path: 'voters',
  name: 'Voters',
  childRoutes: [
    { path: 'default-page', name: 'Default page', component: DefaultPage, isIndex: true },
    { path: '/district/:district_id', name: 'District page', component: DistrictPage },
  ],
};
