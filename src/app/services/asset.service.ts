import { environment } from '../../environments/enviroment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CryptoAssetsState } from '../state/crypto-assets.model';
import { Store } from '@ngrx/store';
import { CryptoAssetsAction } from '../state/crypto-assets.actions';
import { CryptoAsset } from '../models/crypto-asset';

@Injectable({
  providedIn: 'root',
})
export class CryptoAssetService {
  public alertMessage: string = 'Loading Crypto Assets...';

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
      CryptoAssetsAction.toggleCryptoAssetFavorite({ asset: updatedAsset })
    );
    this.store.dispatch(CryptoAssetsAction.updateFavoriteAsset());
  }
}
