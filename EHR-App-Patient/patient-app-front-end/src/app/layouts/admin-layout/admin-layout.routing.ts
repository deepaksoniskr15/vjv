import { Routes } from '@angular/router';

import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { IconsComponent } from '../../icons/icons.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'patient/add', component: IconsComponent },
    { path: 'patient/view', component: UserProfileComponent }
];
