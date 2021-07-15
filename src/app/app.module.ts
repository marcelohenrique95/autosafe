
import { JwtInterceptor } from './jwt.interceptor';


import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './theme/shared/shared.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { AuthComponent } from './theme/layout/auth/auth.component';
import { NavigationComponent } from './theme/layout/admin/navigation/navigation.component';
import { NavLogoComponent } from './theme/layout/admin/navigation/nav-logo/nav-logo.component';
import { NavContentComponent } from './theme/layout/admin/navigation/nav-content/nav-content.component';
import {NavigationItem} from './theme/layout/admin/navigation/navigation';
import { NavGroupComponent } from './theme/layout/admin/navigation/nav-content/nav-group/nav-group.component';
import { NavCollapseComponent } from './theme/layout/admin/navigation/nav-content/nav-collapse/nav-collapse.component';
import { NavItemComponent } from './theme/layout/admin/navigation/nav-content/nav-item/nav-item.component';
import { NavBarComponent } from './theme/layout/admin/nav-bar/nav-bar.component';
import {ToggleFullScreenDirective} from './theme/shared/full-screen/toggle-full-screen';
import {NgbAccordionModule, NgbButtonsModule, NgbDropdownModule, NgbTabsetModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import { NavLeftComponent } from './theme/layout/admin/nav-bar/nav-left/nav-left.component';
import { NavSearchComponent } from './theme/layout/admin/nav-bar/nav-left/nav-search/nav-search.component';
import { NavRightComponent } from './theme/layout/admin/nav-bar/nav-right/nav-right.component';
import { ConfigurationComponent } from './theme/layout/admin/configuration/configuration.component';
import { ListUserComponent } from './demo/pages/list-user/list-user.component';
import { RegisterUserComponent } from './demo/pages/register-user/register-user.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoginComponent } from './demo/pages/login/login.component';


import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ListProductComponent } from './demo/pages/list-product/list-product.component';
import { RegisterProductComponent } from './demo/pages/register-product/register-product.component';
import { BuyComponent } from './demo/pages/buy/buy.component';
import { MyservicesComponent } from './demo/pages/myservices/myservices.component';
import { CompanyComponent } from './demo/pages/company/company.component';
import { ListPartnerComponent } from './demo/pages/list-partner/list-partner.component';
import { RegisterPartnerComponent } from './demo/pages/register-partner/register-partner.component';
import { BranchComponent } from './demo/pages/branch/branch.component';
import { ListBranchComponent } from './demo/pages/list-branch/list-branch.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { RegisterServicesComponent } from './demo/pages/register-services/register-services.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxCurrencyModule } from 'ngx-currency';
import { NewPartnerOutsiteComponent } from './demo/pages/new-partner-outsite/new-partner-outsite.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AuthComponent,
    NavigationComponent,
    NavLogoComponent,
    NavContentComponent,
    NavGroupComponent,
    NavCollapseComponent,
    NavItemComponent,
    NavBarComponent,
    ToggleFullScreenDirective,
    NavLeftComponent,
    NavSearchComponent,
    NavRightComponent,
    ConfigurationComponent,
    ListUserComponent,
    RegisterUserComponent,
    LoginComponent,
    NewPartnerOutsiteComponent,
    ListPartnerComponent,
    ListProductComponent,
    RegisterProductComponent,
    RegisterPartnerComponent,
    BuyComponent,
    MyservicesComponent,
    CompanyComponent,
    BranchComponent,
    ListBranchComponent,
    RegisterServicesComponent,
    NewPartnerOutsiteComponent

  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbButtonsModule,
    NgbTabsetModule,
    NgxPaginationModule,
    FontAwesomeModule,
    HttpClientModule,
    NgSelectModule,
    NgbAccordionModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgxCurrencyModule
  ],
  providers: [
    NavigationItem,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
