import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { ZoroModule } from '../zoro.module';
import { CryptoAssetsComponent } from './components/crypto-assets/crypto-assets.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  CRYPTOASSETS_STATE_KEY,
  cryptoAssetsReducer,
} from './state/crypto-assets.reducer';
import { CryptoAssetsEffects } from './state/crypto-assets.effects';
import { CryptoAssetsRoutingModule } from './crypto-assets-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CryptoAssetsComponent, FavoritesComponent],
  imports: [
    CommonModule,
    ZoroModule,
    CryptoAssetsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    StoreModule.forFeature(CRYPTOASSETS_STATE_KEY, cryptoAssetsReducer),
    EffectsModule.forFeature([CryptoAssetsEffects]),
  ],
})
export class CryptoAssetsModule {}
