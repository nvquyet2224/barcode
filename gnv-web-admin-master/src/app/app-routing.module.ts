import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { FullLayoutComponent } from './layouts/full/full-layout.component';
import { ContentLayoutComponent } from './layouts/content/content-layout.component';

import { AuthGuard } from './guards/auth.guard';
import {LoginPageComponent} from './pages/login/login-page.component';
import { RegisterPageComponent } from './pages/register/register-page.component';
import { ForgotPasswordPageComponent } from './pages/forgot-password/forgot-password-page.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import { UserComponent} from './pages/user/user.component';
import { UserDetailComponent } from './pages/user/user-detail/user-detail.component';
import { UserCreateComponent } from './pages/user/user-create/user-create.component';
import { RoleComponent } from './pages/role/role.component';
import { RoleDetailComponent } from './pages/role/role-detail/role-detail.component';
import { RoleCreateComponent } from './pages/role/role-create/role-create.component';
import { PermissionManagementComponent } from './pages/permission-management/permission-management.component';
import { PermissionCreateComponent } from './pages/permission-management/permission-create/permission-create.component';
import { FormdataUploadComponent } from './pages/formdata-upload/formdata-upload.component';

import { WarehousesComponent, WarehouseCreateComponent, WarehouseUpdateComponent } from './pages/_delivery/warehouses/index';
import { WarehouseDetailComponent, WarehouseDetailCreateComponent, WarehouseDetailUpdateComponent } from './pages/_delivery/warehouse-detail/index';
import { AreaTypeComponent, AreaTypeCreateComponent, AreaTypeUpdateComponent,
          DistrictComponent, DistrictCreateComponent, DistrictUpdateComponent,
          LocationComponent, LocationCreateComponent, LocationUpdateComponent,
          ProvinceComponent, ProvinceCreateComponent, ProvinceUpdateComponent,
          SupportTypeComponent, SupportTypeCreateComponent, SupportTypeUpdateComponent} from './pages/_delivery/locations/index';
import { DemoPrintComponent } from './pages/demo-print/demo-print.component';
import { RoutesComponent, ParcelOrderStatusComponent,
        ParcelOrderComponent, OrderNotesComponent,
        MultiPhotoComponent, ParcelOrderCreateComponent, ParcelOrderUpdateComponent, GroupComponent } from './pages/_parcel_order/index';
const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: { title: 'full Views' },
    children: [
      {
        path: 'users',
        component: UserComponent
      },
      {
        path: 'user/formdata-upload/:id',
        component: FormdataUploadComponent
      },
      {
        path: 'user/detail/:id',
        component: UserDetailComponent
      },
      {
        path: 'user/create',
        component: UserCreateComponent
      },
      {
        path: 'roles',
        component: RoleComponent
      },
      {
        path: 'role/detail/:id',
        component: RoleDetailComponent
      },
      {
        path: 'role/create',
        component: RoleCreateComponent
      },
      {
        path: 'permission-management',
        component: PermissionManagementComponent
      },
      {
        path: 'permission/create',
        component: PermissionCreateComponent
      },
      {
        path: 'warehouses',
        component: WarehousesComponent
      },
      {
        path: 'warehouse/create',
        component: WarehouseCreateComponent
      },
      {
        path: 'warehouse/view/:id',
        component: WarehouseUpdateComponent
      },
      {
        path: 'warehouses-detail',
        component: WarehouseDetailComponent
      },
      {
        path: 'warehouse-detail/create',
        component: WarehouseDetailCreateComponent
      },
      {
        path: 'warehouse-detail/view/:id',
        component: WarehouseDetailUpdateComponent
      },
      {
        path: 'provinces',
        component: ProvinceComponent
      },
      {
        path: 'province/create',
        component: ProvinceCreateComponent
      },
      {
        path: 'province/view/:id',
        component: ProvinceUpdateComponent
      },
      {
        path: 'districts',
        component: DistrictComponent
      },
      {
        path: 'district/create',
        component: DistrictCreateComponent
      },
      {
        path: 'district/view/:id',
        component: DistrictUpdateComponent
      },
      {
        path: 'area-types',
        component: AreaTypeComponent
      },
      {
        path: 'area-type/create',
        component: AreaTypeCreateComponent
      },
      {
        path: 'area-type/view/:id',
        component: AreaTypeUpdateComponent
      },
      {
        path: 'parcels-orders',
        component: ParcelOrderComponent
      },
      {
        path: 'parcels-orders/create',
        component: ParcelOrderCreateComponent
      },
      {
        path: 'parcels-orders/update',
        component: ParcelOrderUpdateComponent
      },
      {
        path: 'parcels-orders/group',
        component: GroupComponent
      },
      {
        path: 'demo-print',
        component: DemoPrintComponent
      },
      {
        path: 'user/dashboard',
        component: DashboardComponent
      },
      {
        path: 'user/chart',
        component: DashboardComponent
      },
    ],
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: ContentLayoutComponent,
    data: { title: 'content Views' },
    children: [
      {
        path: 'login',
        component: LoginPageComponent
      },
    ]
  },
  {
    path: '',
    data: { title: 'Register' },
    children: [
      {
        path: 'register',
        component: RegisterPageComponent
      },
    ]
  },
  {
    path: '',
    data: { title: 'Forgot Password' },
    children: [
      {
        path: 'forgotpassword',
        component: ForgotPasswordPageComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
