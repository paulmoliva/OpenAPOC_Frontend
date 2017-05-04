import {
  DefaultPage,
} from './';

export default {
  path: 'users',
  name: 'Users',
  childRoutes: [
    { path: 'default-page', name: 'Default page', component: DefaultPage, isIndex: true },
  ],
};
