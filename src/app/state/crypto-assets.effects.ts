import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  Observable,
  catchError,
  map,
  mergeMap,
  of,
  switchMap,
  take,
  tap,
} from 'rxjs';
import {
  CryptoAssetsAction,
  CryptoAssetsEffect,
} from './crypto-assets.actions';
import { CryptoAssetService } from '../services/asset.service';
import { CryptoAsset } from '../models/crypto-asset';
import { CryptoAssetsSelectors } from './crypto-assets.selectors';

@Injectable()
export class CryptoAssetsEffects {
  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private cryptoAssetService: CryptoAssetService
  ) {}

  getCryptoAssets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CryptoAssetsEffect.GET_CRYPTO_ASSETS),
      switchMap(() =>
        this.cryptoAssetService.getAssets().pipe(
          mergeMap((assets: CryptoAsset[]) => {
            return this.updateResponseWithFavourite(assets);
          }),
          take(1),
          map((assets: CryptoAsset[]) => {
            return CryptoAssetsAction.getCryptoAssetsSuccess({
              params: { assets },
            });
          }),
          catchError(() => {
            this.cryptoAssetService.alertMessage =
              'Error Occured, please reload!';
            return of(CryptoAssetsAction.getCryptoAssetsFail());
          })
        )
      )
    )
  );

  private updateResponseWithFavourite(
    assets: CryptoAsset[]
  ): Observable<CryptoAsset[]> {
    return this.store.select(CryptoAssetsSelectors.favoriteAssets).pipe(
      map((favoriteAssets) => {
        const favoriteAssetsIds = favoriteAssets?.map(
          (asset) => asset.asset_id
        );
        const mappedAssets = assets.map((asset: CryptoAsset) => {
          return {
            ...asset,
            is_favorite: favoriteAssetsIds?.includes(asset.asset_id),
          };
        });
        return mappedAssets;
      })
    );
  }
}
