import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './dashboard/home/home.component';
import { ListComponent } from './records/list/list.component';
import { RegisterComponent } from './auth/register/register.component';
import { CreditosComponent } from './creditos/creditos.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'records', component: ListComponent, canActivate: [AuthGuard] },
    { path: 'register', component: RegisterComponent },
    { path: 'creditos', component: CreditosComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '/login' }
];
