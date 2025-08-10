import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes'),
    //TODO: GUARDS
  },
  {
    path: '',
    loadChildren: () => import('./store-front/store-front.routes'),
  },
];
