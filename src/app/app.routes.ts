import { Routes } from '@angular/router';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { AUTH_ROUTES } from './auth-page/auth.routes';
import { HomeComponent } from './home/home.component';
import { authGuard } from './auth-page/auth.guard';
import { HOME_ROUTES } from './home/home.routes';

export const routes: Routes = [
    {path: "auth", component: AuthPageComponent, children: AUTH_ROUTES},
    {path: "home", component: HomeComponent, canActivate: [authGuard], children: HOME_ROUTES},
    {path: "**", redirectTo: 'home', pathMatch: "full"}
];
