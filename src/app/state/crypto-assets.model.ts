import { CryptoAsset } from '../models/crypto-asset';

export interface CryptoAssetsState {
  assets?: CryptoAsset[];
  favoriteAssets?: CryptoAsset[];
}
