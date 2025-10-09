import { Routes } from '@angular/router';
import { DashboardComponent } from './components/main/dashboard/dashboard.component';
import { HistoricoComponent } from './components/main/historico/historico.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistereComponent } from './auth/registere/registere.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'dashboard', component: DashboardComponent
  },
  {
    path: 'historico', component: HistoricoComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'registro', component: RegistereComponent
  }
];
