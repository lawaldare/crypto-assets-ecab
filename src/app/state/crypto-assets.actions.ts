import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CryptoAsset } from '../models/crypto-asset';

export const CryptoAssetsAction = createActionGroup({
  source: 'Crypto Assets Page',
  events: {
    'Get Crypto Assets': emptyProps(),
    'Get Crypto Assets Success': props<{ assets: CryptoAsset[] }>(),
    'Get Crypto Assets Failure': emptyProps(),
    'Update Favorite Asset': emptyProps(),
    'Sort Crypto Assets': emptyProps(),
    'Toggle Crypto Asset Favorite': props<{ asset: CryptoAsset }>(),
  },
});
