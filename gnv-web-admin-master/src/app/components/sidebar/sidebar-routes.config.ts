import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  {
    path: '', title: 'User', icon: 'ft-minimize', class: 'menu-tag', badge: '', badgeClass: '', isExternalLink: false, submenu: []
  },
  {
    path: '/users', title: 'Users', icon: 'ft-user', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
  },
  {
    path: '/roles', title: 'Roles', icon: 'ft-users', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
  },
  {
    path: '/permission-management', title: 'Permission', icon: 'ft-users', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
  },
  {
    path: '', title: 'Delivery', icon: 'ft-minimize', class: 'menu-tag', badge: '', badgeClass: '', isExternalLink: false, submenu: []
  },
  {
    path: '/warehouses', title: 'Warehouses', icon: 'ft-box', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
  },
  {
    path: '/warehouses-detail', title: 'Warehouses Detail', icon: 'ft-box', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
  },
  {
    path: '/provinces', title: 'Provinces', icon: 'ft-map-pin', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
  },
  {
    path: '/districts', title: 'Districts', icon: 'ft-map-pin', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
  },
  {
    path: '/area-types', title: 'Area Types', icon: 'ft-map-pin', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
  },
  {
    path: '', title: 'Parcel/Order', icon: 'ft-minimize', class: 'menu-tag', badge: '', badgeClass: '', isExternalLink: false, submenu: []
  },
  {
    path: '/parcels-orders', title: 'Parcels/Orders', icon: 'ft-file-text', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
  },
  {
    path: '/demo-print', title: 'Demo Print', icon: 'ft-printer', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
  },
  {
    path: '/warehouses-detail', title: 'Menu Levels1', icon: 'ft-align-left', class: 'has-sub', badge: '1', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false,
    submenu: [
      { path: 'javascript:;', title: 'Second Level', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
      {
        path: '', title: 'Second Level Child', icon: '', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
          { path: 'javascript:;', title: 'Third Level 1.1', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
          { path: 'javascript:;', title: 'Third Level 1.2', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
        ]
      },
    ]
  },
  {
    path: '/full-layout', title: 'Full Layout', icon: 'ft-layout', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
  },
  {
    path: '/content-layout', title: 'Content Layout', icon: 'ft-square', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
  },
  {
    path: '', title: 'Menu Levels', icon: 'ft-align-left', class: 'has-sub', badge: '1', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false,
    submenu: [
      { path: 'javascript:;', title: 'Second Level', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
      {
        path: '', title: 'Second Level Child', icon: '', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
          { path: 'javascript:;', title: 'Third Level 1.1', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
          { path: 'javascript:;', title: 'Third Level 1.2', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
        ]
      },
    ]
  },
  // {
  //     path: '/changelog', title: 'ChangeLog', icon: 'ft-file', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
  // },
  { path: 'https://pixinvent.com/apex-angular-4-bootstrap-admin-template/documentation', title: 'Documentation', icon: 'ft-folder', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
  { path: 'https://pixinvent.ticksy.com/', title: 'Support', icon: 'ft-life-buoy', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
];
