import { Routes } from '@angular/router';
import { HomeComponent } from './app/home/home.component';
import { NotifyComponentComponent } from './app/notify-component/notify-component.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'notify', component: NotifyComponentComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
