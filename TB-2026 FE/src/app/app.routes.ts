import { Routes } from '@angular/router';
import { LayoutContainerComponent } from './layout/components/layout-container/layout-container.component';
import { ClientGridComponent } from './accounts/components/client-grid/client-grid.component';
import { AccountDetailsComponent } from './accounts/components/account-details/account-details.component';
import { APP_ROUTES_PATH_CONST } from './core/constants/app-routing-contants';

export const routes: Routes = [
  {
    path: '',
    component: LayoutContainerComponent,
    children: [
      { path: APP_ROUTES_PATH_CONST.ACCOUNT_GRID, component: ClientGridComponent },
      { path: APP_ROUTES_PATH_CONST.ACCOUNT_DETAILS, component: AccountDetailsComponent },
      { path: '', redirectTo: APP_ROUTES_PATH_CONST.ACCOUNT_GRID, pathMatch: 'full' }
    ]
  }
];