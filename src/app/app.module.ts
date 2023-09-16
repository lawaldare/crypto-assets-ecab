import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ZoroModule } from './zoro.module';
import { CryptoAssetsEffects } from './state/crypto-assets.effects';
import {
  CRYPTOASSETS_STATE_KEY,
  cryptoAssetsReducer,
} from './state/crypto-assets.reducer';
import { CryptoAssetsComponent } from './components/crypto-assets/crypto-assets.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { SharedModule } from './shared/shared.module';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CryptoAssetsComponent,
    FavoritesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ZoroModule,
    SharedModule,
    BrowserAnimationsModule,
    StoreModule.forFeature(CRYPTOASSETS_STATE_KEY, cryptoAssetsReducer),
    EffectsModule.forFeature([CryptoAssetsEffects]),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      name: 'Ecabs Crypto',
      maxAge: 100,
    }),
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
})
export class AppModule {}
