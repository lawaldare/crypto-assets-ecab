import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CryptoAssetsComponent } from './components/crypto-assets/crypto-assets.component';
import { FavoritesComponent } from './components/favorites/favorites.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'assets' },
  {
    path: 'assets',
    component: CryptoAssetsComponent,
  },
  {
    path: 'favorites',
    component: FavoritesComponent,
  },
  { path: '**', pathMatch: 'full', redirectTo: 'assets' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
