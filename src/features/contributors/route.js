import {
  DefaultPage,
  ContributorPage,
} from './';

export default {
  path: 'contributors',
  name: 'Contributors',
  childRoutes: [
    { path: 'default-page', name: 'Default page', component: DefaultPage, isIndex: true },
    { path: ':id', name: 'Contributor page', component: ContributorPage },
  ],
};
