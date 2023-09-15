import { environment } from './../../../environments/enviroment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AssetIcon, CryptoAsset } from '../models/crypto-asset';
import { CryptoAssetsState } from '../state/crypto-assets.model';
import { Store } from '@ngrx/store';
import { CryptoAssetsAction } from '../state/crypto-assets.actions';

@Injectable({
  providedIn: 'root',
})
export class CryptoAssetService {
  constructor(
    private http: HttpClient,
    private store: Store<CryptoAssetsState>
  ) {}

  getAssets(): Observable<CryptoAsset[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'X-CoinAPI-Key': environment.API_KEY,
      }),
    };
    return this.http.get(
      `${environment.BASE_URL}assets`,
      httpOptions
    ) as Observable<CryptoAsset[]>;
  }

  toggleAssetFavorite(asset: CryptoAsset) {
    const updatedAsset = {
      ...asset,
      is_favorite: !asset.is_favorite,
    };
    this.store.dispatch(
      CryptoAssetsAction.toggleCryptoAssetFavorite({
        params: { asset: updatedAsset },
      })
    );
    this.store.dispatch(CryptoAssetsAction.updateFavoriteAssets());
    // this.store.dispatch(CryptoAssetsAction.sortCryptoAssets());
  }
}
