import { Action, createReducer, on } from '@ngrx/store';
import { CryptoAssetsState } from './crypto-assets.model';
import { CryptoAssetsAction } from './crypto-assets.actions';
import { CryptoAsset } from '../models/crypto-asset';

export const CRYPTOASSETS_STATE_KEY = 'crypto-assets';
const updateCryptoAssetFavorite = (
  assets: CryptoAsset[],
  assetToggled: CryptoAsset
): CryptoAsset[] => {
  const assetToggledInList = assets.find(
    (asset) => asset.asset_id === assetToggled.asset_id
  );
  const assetIndex = assets.findIndex(
    (asset) => asset.asset_id === assetToggledInList?.asset_id
  );
  assets.splice(assetIndex, 1, assetToggled);
  return assets;
};

const saveCryptoAssetFavorite = (assets: CryptoAsset[]): CryptoAsset[] => {
  return assets.filter((asset: CryptoAsset) => asset.is_favorite);
};

const initialState: CryptoAssetsState = {
  favoriteAssets: [],
};

const reducer = createReducer(
  initialState,

  on(
    CryptoAssetsAction.getCryptoAssetsSuccess,
    (state: CryptoAssetsState, action): CryptoAssetsState => {
      return {
        ...state,
        assets: action.assets,
      };
    }
  ),

  on(
    CryptoAssetsAction.updateFavoriteAsset,
    (state: CryptoAssetsState, action): CryptoAssetsState => {
      return {
        ...state,
        favoriteAssets: saveCryptoAssetFavorite([...(state.assets ?? [])]),
      };
    }
  ),
  on(
    CryptoAssetsAction.sortCryptoAssets,
    (state: CryptoAssetsState, action): CryptoAssetsState => {
      const newSortedAssets = [...(state.assets ?? [])].sort(
        (a: any, b: any) => b.is_favorite - a.is_favorite
      );
      return {
        ...state,
        assets: newSortedAssets,
      };
    }
  ),
  on(
    CryptoAssetsAction.toggleCryptoAssetFavorite,
    (state: CryptoAssetsState, action): CryptoAssetsState => {
      return {
        ...state,
        assets: updateCryptoAssetFavorite(
          [...(state.assets ?? [])],
          action.asset
        ),
      };
    }
  )
);

export function cryptoAssetsReducer(state: CryptoAssetsState, action: Action) {
  return reducer(state, action);
}
