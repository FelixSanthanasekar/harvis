import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AddRequestComponent } from './pages/add-request/add-request.component';
import { RequestListComponent } from './pages/request-list/request-list.component';
import { ViewRequestComponent } from './pages/view-request/view-request.component';
import { EditRequestComponent } from './pages/edit-request/edit-request.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'add-request', component: AddRequestComponent },
  { path: 'request-list', component: RequestListComponent },
  { path: 'view-request/:id', component: ViewRequestComponent },
  { path: 'edit-request/:id', component: EditRequestComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/harvis-login.component').then(m => m.HarvisLoginComponent)
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/login/harvis-signup.component').then(m => m.HarvisSignUpComponent)
  },
  { path: '**', redirectTo: 'login' }
]; 