import { Routes } from '@angular/router';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { AUTH_ROUTES } from './auth-page/auth.routes';

export const routes: Routes = [
    {path: "", component: AuthPageComponent, children: AUTH_ROUTES}
];
