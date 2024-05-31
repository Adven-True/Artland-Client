import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './pages/account/account/account.component';
import { LoginComponent } from './pages/account/login/login.component';
import { RegisterComponent } from './pages/account/register/register.component';
// page not exist
import { NopageComponent } from './pages/nopage/nopage.component';
/* home page */
import { HomeComponent } from './pages/home/home/home.component'
import { IndexComponent } from './pages/home/index/index.component'
/* list page */
import { ListComponent } from './pages/home/list/list.component'
/* detail page */
import { DetailComponent } from './pages/home/detail/detail.component'
/* order list */
import { OrderlistComponent } from './pages/home/orderlist/orderlist.component'
/* admin pages */
/* goods management */
import { GoodsmanageComponent } from './pages/home/goodsmanage/goodsmanage.component'
import { GoodseditComponent } from './pages/home/goodsmanage/goodsedit/goodsedit.component'
/* order list */
import { OrdermanageComponent } from './pages/home/ordermanage/ordermanage.component'
/* user management */
import { UsermanageComponent } from './pages/home/usermanage/usermanage.component'
import { UsereditComponent } from './pages/home/usermanage/useredit//useredit.component'
/* shopping cart */
import { ShopcartComponent } from './pages/home/shopcart/shopcart.component'

/* introducing route interception  */
import { RoleGuard } from './role.guard';
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home/index' },
  {
    path: 'account',
    component: AccountComponent,
    children: [
      /* login in */
      { path: 'login', component: LoginComponent },
      /* registration */
      { path: 'register', component: RegisterComponent },
    ]
  },
  /* main page */
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'index', component: IndexComponent
      },
      {
        // product list
        path: 'list',
        component: ListComponent,
        canActivate: [RoleGuard], // Use RoleGuard to protect this route
        data: { meta: { auth: 'user' } }
      },
      {
        // product detail
        path: 'detail/:id',
        component: DetailComponent,
        canActivate: [RoleGuard], // Use RoleGuard to protect this route
        data: { meta: { auth: 'user' } }
      },
      {
        // order list
        path: 'orderlist',
        component: OrderlistComponent,
        canActivate: [RoleGuard], // Use RoleGuard to protect this route
        data: { meta: { auth: 'user' } }
      },
      {
        // shopping cart
        path: 'shopcard', component: ShopcartComponent,
        canActivate: [RoleGuard], // Use RoleGuard to protect this route
        data: { meta: { auth: 'user' } }
      },
      /* admin pages */
      {
        // order list
        path: 'goodsmanage', component: GoodsmanageComponent,
        canActivate: [RoleGuard], // Use RoleGuard to protect this route
        data: { meta: { auth: 'admin' } }
      },
      {
        // edit product 
        path: 'goodsmanageedit/:id', component: GoodseditComponent,
        canActivate: [RoleGuard], // Use RoleGuard to protect this route
        data: { meta: { auth: 'admin' } }
      }, {
        // add product
        path: 'goodsmanageedit', component: GoodseditComponent,
        canActivate: [RoleGuard], // Use RoleGuard to protect this route
        data: { meta: { auth: 'admin' } }
      },
      {
        // order list
        path: 'ordermanagelist', component: OrdermanageComponent,
        canActivate: [RoleGuard], // Use RoleGuard to protect this route
        data: { meta: { auth: 'admin' } }
      },
      {
        // user management
        path: 'usermanagelist', component: UsermanageComponent,
        canActivate: [RoleGuard], // Use RoleGuard to protect this route
        data: { meta: { auth: 'admin' } }
      },
      {
        // user management
        path: 'usermanageedit/:id', component: UsereditComponent,
        canActivate: [RoleGuard], // Use RoleGuard to protect this route
        data: { meta: { auth: 'admin' } }
      }

    ]
  },
  /* when the route does not exist, redirect to page 404 */
  { path: '404', component: NopageComponent },
  /* Route for pages that does not exist */
  { path: '**', component: NopageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
