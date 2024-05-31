import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router'; // import RouterModule
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, Location, LocationStrategy } from '@angular/common';
/* ========================== */
/* components */
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
/* Common Head Assembly */
import { HeadersComponent } from './pages/components/headers/headers.component';
import { AccountComponent } from './pages/account/account/account.component';
import { LoginComponent } from './pages/account/login/login.component';
import { RegisterComponent } from './pages/account/register/register.component';
/* home page */
import { HomeComponent } from './pages/home/home/home.component'
import { IndexComponent } from './pages/home/index/index.component'
/* list page  */
import { ListComponent } from './pages/home/list/list.component'
/* detail page */
import { DetailComponent } from './pages/home/detail/detail.component'
import { OrderlistComponent } from './pages/home/orderlist/orderlist.component'
import { ConfirmDialogComponent } from './pages/components/confirm-dialog/confirm-dialog.component'
/* admin pages */
/* product management */
import { GoodsmanageComponent } from './pages/home/goodsmanage/goodsmanage.component'
import { GoodseditComponent } from './pages/home/goodsmanage/goodsedit/goodsedit.component'
/* order list */
import { OrdermanageComponent } from './pages/home/ordermanage/ordermanage.component'
/* user management */
import { UsermanageComponent } from './pages/home/usermanage/usermanage.component'
import { UsereditComponent } from './pages/home/usermanage/useredit/useredit.component'
/* shopping cart */
import { ShopcartComponent } from './pages/home/shopcart/shopcart.component'
/* interfaces */
import { GoodsService } from '@/api/goods'
import { UserService } from '@/api/user';
import { OrderService } from '@/api/order';
@NgModule({
  declarations: [
    AppComponent,
    HeadersComponent,
    AccountComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    IndexComponent,
    ListComponent,
    DetailComponent,
    ConfirmDialogComponent,
    OrderlistComponent,
    GoodsmanageComponent,
    GoodseditComponent,
    OrdermanageComponent,
    UsermanageComponent,
    UsereditComponent,
    ShopcartComponent
  ],
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
  ],
  providers: [
    // hash router
    Location,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    GoodsService,
    UserService,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
