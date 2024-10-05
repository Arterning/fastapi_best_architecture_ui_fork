import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const DASHBOARD: AppRouteRecordRaw = {
  path: '/data',
  name: 'data',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.data',
    requiresAuth: true,
    icon: 'IconApps',
    order: 1,
    hideInMenu: false,
  },
  children: [
    {
      path: 'doc',
      name: 'Doc',
      component: () => import('@/views/data/doc/index.vue'),
      meta: {
        locale: 'menu.data.doc',
        requiresAuth: true,
        icon: 'IconFile',
        roles: ['*'],
        hideInMenu: false,
      },
    },
    {
        path: 'upload',
        name: 'Upload',
        component: () => import('@/views/data/upload/index.vue'),
        meta: {
          locale: 'menu.data.upload',
          requiresAuth: true,
          roles: ['*'],
          hideInMenu: false,
          icon: 'IconUpload',
        },
      },
  ],
};

export default DASHBOARD;
