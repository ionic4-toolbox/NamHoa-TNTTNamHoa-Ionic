import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'trang-chu',
    pathMatch: 'full'
  },
  {
    path: 'trang-chu',
    loadChildren: './pages/dashboard/dashboard.module#DashboardPageModule'
  },
  {
    path: 'tai-khoan/:userID',
    loadChildren: './pages/details/details.module#DetailsPageModule'
  },
  {
    path: '**',
    redirectTo: 'trang-chu',
    pathMatch: 'full'
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
