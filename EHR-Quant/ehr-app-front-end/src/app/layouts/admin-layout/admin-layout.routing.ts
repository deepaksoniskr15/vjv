import { Routes } from '@angular/router';

import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { IconsComponent } from '../../icons/icons.component';
import { ViewListPermissionsComponent } from '../../permissions/view-list-permissions/view-list-permissions.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'patient/add', component: IconsComponent },
    { path: 'patient/view', component: UserProfileComponent },
    { path: 'permission/view', component: ViewListPermissionsComponent }
];
