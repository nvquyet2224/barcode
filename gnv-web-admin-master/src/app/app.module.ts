import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from './components/components.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CKEditorModule } from 'ngx-ckeditor';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_FORMATS } from 'ng-pick-datetime';
import { OwlMomentDateTimeModule } from 'ng-pick-datetime-moment';

import { AppComponent } from './app.component';
import { ContentLayoutComponent } from './layouts/content/content-layout.component';
import { FullLayoutComponent } from './layouts/full/full-layout.component';
import { MDBBootstrapModule } from './typescripts/free';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { UserService } from './services/user.service';

import * as $ from 'jquery';
import { LoginPageComponent } from './pages/login/login-page.component';
import { RegisterPageComponent } from './pages/register/register-page.component';
import { ForgotPasswordPageComponent } from './pages/forgot-password/forgot-password-page.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Select2Module } from 'ng2-select2';
import { BrowserModule } from '@angular/platform-browser';

import { UserComponent } from './pages/user/user.component';
import { UserDetailComponent } from './pages/user/user-detail/user-detail.component';
import { UserAddComponent } from './pages/user/user-add/user-add.component';
import { UserCreateComponent } from './pages/user/user-create/user-create.component';
import { RoleComponent } from './pages/role/role.component';
import { RoleDetailComponent } from './pages/role/role-detail/role-detail.component';
import { RoleCreateComponent } from './pages/role/role-create/role-create.component';
import { RoleService } from './services/role.service';
import { PermissionManagementComponent } from './pages/permission-management/permission-management.component';
import { PermissionService } from './services/permission.service';
import { PermissionCreateComponent } from './pages/permission-management/permission-create/permission-create.component';
import { MessageService } from './services/message.service';
import { FormdataUploadComponent } from './pages/formdata-upload/formdata-upload.component';
import { FormdataUploadService } from './services/formdata-upload.service';

// Delivery
import { WarehouseService, LocationService, WarehouseDetailService,
        ProvinceService, DistrictService, AreaTypeService, DeliveryService } from './services/_delivery/index';
import { WarehousesComponent, WarehouseCreateComponent } from './pages/_delivery/warehouses/index';
import { WarehouseUpdateComponent } from './pages/_delivery/warehouses/warehouse-update/warehouse-update.component';
import { WarehouseDetailComponent } from './pages/_delivery/warehouse-detail/warehouse-detail/warehouse-detail.component';
import { WarehouseDetailCreateComponent } from './pages/_delivery/warehouse-detail/warehouse-detail-create/warehouse-detail-create.component';
import { WarehouseDetailUpdateComponent } from './pages/_delivery/warehouse-detail/warehouse-detail-update/warehouse-detail-update.component';

import { SupportTypeUpdateComponent, SupportTypeCreateComponent, SupportTypeComponent,
        AreaTypeComponent, AreaTypeUpdateComponent, AreaTypeCreateComponent,
        ProvinceCreateComponent, ProvinceUpdateComponent, ProvinceComponent,
        DistrictComponent, DistrictUpdateComponent, DistrictCreateComponent,
        LocationUpdateComponent, LocationCreateComponent, LocationComponent
      } from './pages/_delivery/locations/index';

import { MultiPhotoComponent, OrderNotesComponent,
        ParcelOrderComponent, ParcelOrderStatusComponent,
        RoutesComponent, GroupComponent } from './pages/_parcel_order/index';
import { MultiPhotoService, OrderNotesService,
        ParcelOrderService, ParcelOrderStatusService,
        RoutesService } from './services/_parcel_order/index';

import { DemoPrintComponent } from './pages/demo-print/demo-print.component';
import { DeliveryComponent } from './pages/_delivery/delivery/delivery.component';
import { ParcelOrderCreateComponent } from './pages/_parcel_order/parcel-order/parcel-order-create/parcel-order-create.component';
import { ParcelOrderUpdateComponent } from './pages/_parcel_order/parcel-order/parcel-order-update/parcel-order-update.component';

export const MY_MOMENT_FORMATS = {
  parseInput: 'DD/MM/YYYY HH:mm',
  fullPickerInput: 'DD/MM/YYYY HH:mm',
  datePickerInput: 'l',
  timePickerInput: 'LT',
  monthYearLabel: 'MMM YYYY',
  dateA11yLabel: 'LL',
  monthYearA11yLabel: 'MMMM YYYY',
};
@NgModule({
  declarations: [
    AppComponent,
    FullLayoutComponent,
    ContentLayoutComponent,
    LoginPageComponent,
    RegisterPageComponent,
    ForgotPasswordPageComponent,
    DashboardComponent,
    UserComponent,
    UserDetailComponent,
    UserAddComponent,
    UserCreateComponent,
    RoleComponent,
    RoleDetailComponent,
    RoleCreateComponent,
    PermissionManagementComponent,
    PermissionCreateComponent,
    FormdataUploadComponent,
    WarehousesComponent,
    WarehouseCreateComponent,
    WarehouseUpdateComponent,
    WarehouseDetailComponent,
    WarehouseDetailCreateComponent,
    WarehouseDetailUpdateComponent,
    LocationComponent,
    LocationUpdateComponent,
    LocationCreateComponent,
    DistrictComponent,
    DistrictCreateComponent,
    DistrictUpdateComponent,
    ProvinceComponent,
    ProvinceUpdateComponent,
    ProvinceCreateComponent,
    AreaTypeComponent,
    AreaTypeUpdateComponent,
    AreaTypeCreateComponent,
    SupportTypeComponent,
    SupportTypeUpdateComponent,
    SupportTypeCreateComponent,
    DemoPrintComponent,
    DeliveryComponent,
    ParcelOrderComponent,
    RoutesComponent,
    ParcelOrderStatusComponent,
    MultiPhotoComponent,
    OrderNotesComponent,
    ParcelOrderCreateComponent,
    ParcelOrderUpdateComponent,
    GroupComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    OwlDateTimeModule,
    OwlMomentDateTimeModule,
    AppRoutingModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    HttpClientModule,
    NgbModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    Select2Module
  ],
  providers: [
    {provide: OWL_DATE_TIME_FORMATS, useValue: MY_MOMENT_FORMATS},
    AuthService,
    AuthGuard,
    CookieService,
    UserService,
    RoleService,
    PermissionService,
    MessageService,
    FormdataUploadService,
    WarehouseService,
    LocationService,
    WarehouseDetailService,
    ProvinceService,
    DistrictService,
    AreaTypeService,
    DeliveryService,
    MultiPhotoService,
    OrderNotesService,
    ParcelOrderService,
    ParcelOrderStatusService,
    RoutesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
