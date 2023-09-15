import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CryptoAssetsComponent } from './components/crypto-assets/crypto-assets.component';
import { FavoritesComponent } from './components/favorites/favorites.component';

const routes: Routes = [
  {
    path: '',
    component: CryptoAssetsComponent,
  },
  {
    path: 'favorites',
    component: FavoritesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CryptoAssetsRoutingModule {}
