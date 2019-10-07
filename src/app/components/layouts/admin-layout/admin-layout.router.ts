import { Routes } from '@angular/router';
import { DashboardAdminComponent } from '../../dashboard-admin/dashboard-admin.component';
import { UserListComponent } from '../../user-list/user-list.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { UserCreateComponent } from './../../formsparts/user-create/user-create.component';

export const AdminLayoutRoutes: Routes = [
    {
        path: 'dashboard',
        component: DashboardAdminComponent
    },
    {
        path: 'user-list',
        component: UserListComponent
    },
    {
        path: 'user-profile',
        component: UserProfileComponent
    },
    {
        path: 'create-user',
        component: UserCreateComponent
    },
    {
        path: 'edit-user/:id',
        component: UserCreateComponent
    }
];
