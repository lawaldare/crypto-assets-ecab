import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CryptoAssetsState } from './crypto-assets.model';
import { CRYPTOASSETS_STATE_KEY } from './crypto-assets.reducer';

const cryptoAssetsState = createFeatureSelector<CryptoAssetsState>(
  CRYPTOASSETS_STATE_KEY
);

export const CryptoAssetsSelectors = {
  state: cryptoAssetsState,
  assets: createSelector(cryptoAssetsState, (state) => state.assets),
  favoriteAssets: createSelector(
    cryptoAssetsState,
    (state) => state.favoriteAssets
  ),
};
