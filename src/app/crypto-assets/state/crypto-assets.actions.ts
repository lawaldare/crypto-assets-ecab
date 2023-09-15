import { createAction, props } from '@ngrx/store';
import { CryptoAsset } from '../models/crypto-asset';

const GET_CRYPTO_ASSETS = '[Crypto Assets Page] Get Crypto Assets';
const GET_CRYPTO_ASSETS_SUCCESS = `${GET_CRYPTO_ASSETS} Success`;
const GET_CRYPTO_ASSETS_FAIL = `${GET_CRYPTO_ASSETS} Fail`;

const UPDATE_FAVORITE_ASSETS = '[Crypto Assets Page] Update Favorite Assets';

const TOGGLE_CRYPTO_ASSET_FAVORITE =
  '[Crypto Assets Page] Toggle Crypto Asset Favorite';

const SORT_CRYPTO_ASSETS = '[Crypto Assets Page] Sort Crypto Assets';

export const CryptoAssetsEffect = {
  GET_CRYPTO_ASSETS,
};

export const CryptoAssetsAction = {
  getCryptoAssets: createAction(GET_CRYPTO_ASSETS),
  getCryptoAssetsSuccess: createAction(
    GET_CRYPTO_ASSETS_SUCCESS,
    props<{ params: { assets: CryptoAsset[] } }>()
  ),
  getCryptoAssetsFail: createAction(GET_CRYPTO_ASSETS_FAIL),

  updateFavoriteAssets: createAction(UPDATE_FAVORITE_ASSETS),

  sortCryptoAssets: createAction(SORT_CRYPTO_ASSETS),

  toggleCryptoAssetFavorite: createAction(
    TOGGLE_CRYPTO_ASSET_FAVORITE,
    props<{ params: { asset: CryptoAsset } }>()
  ),
};
