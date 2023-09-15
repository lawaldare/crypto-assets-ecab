import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'assets' },
  {
    path: 'assets',
    loadChildren: () =>
      import('./crypto-assets/crypto-assets.module').then(
        (m) => m.CryptoAssetsModule
      ),
  },
  { path: '**', pathMatch: 'full', redirectTo: 'assets' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
