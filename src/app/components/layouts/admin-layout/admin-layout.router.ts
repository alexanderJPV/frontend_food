
import { Routes } from '@angular/router';
import { DashboardAdminComponent } from '../../dashboard-admin/dashboard-admin.component';
import { UserListComponent } from '../../user-list/user-list.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardAdminComponent },
    { path: 'user-list', component: UserListComponent }
];
