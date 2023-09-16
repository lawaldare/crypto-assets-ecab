import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CryptoAssetsState } from '../../state/crypto-assets.model';
import { CryptoAssetsSelectors } from '../../state/crypto-assets.selectors';
import { CryptoAssetService } from '../../services/asset.service';
import { CryptoAssetsAction } from '../../state/crypto-assets.actions';
import { CryptoAsset } from 'src/app/models/crypto-asset';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnDestroy {
  assets$ = this.store.select(CryptoAssetsSelectors.favoriteAssets);

  constructor(
    private store: Store<CryptoAssetsState>,
    private cryptoAssetsService: CryptoAssetService
  ) {}

  toggleAsset(asset: CryptoAsset) {
    this.cryptoAssetsService.toggleAssetFavorite(asset);
  }

  ngOnDestroy(): void {
    this.store.dispatch(CryptoAssetsAction.sortCryptoAssets());
  }
}
