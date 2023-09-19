import { TestBed } from '@angular/core/testing';

import { CryptoAssetService } from './asset.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CRYPTOASSETS_STATE_KEY } from '../state/crypto-assets.reducer';
import { of } from 'rxjs';
import { CryptoAsset } from '../models/crypto-asset';
import { CryptoAssetsAction } from '../state/crypto-assets.actions';
const assestsMock: CryptoAsset[] = [
  {
    asset_id: 'BTC',
    name: 'Bitcoin',
    type_is_crypto: 1,
    data_start: '2010-07-17',
    data_end: '2019-11-03',
    data_quote_start: '2014-02-24T17:43:05.0000000Z',
    data_quote_end: '2019-11-03T17:55:07.6724523Z',
    data_orderbook_start: '2014-02-24T17:43:05.0000000Z',
    data_orderbook_end: '2019-11-03T17:55:17.8592413Z',
    data_trade_start: '2010-07-17T23:09:17.0000000Z',
    data_trade_end: '2019-11-03T17:55:11.8220000Z',
    data_symbols_count: 22711,
    volume_1hrs_usd: 102894431436.49,
    volume_1day_usd: 2086392323256.16,
    volume_1mth_usd: 57929168359984.54,
    price_usd: 9166.207274778093436220194944,
    id_icon: '4444444444',
  },
];

describe('CryptoAssetService', () => {
  let service: CryptoAssetService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        provideMockStore({
          initialState: {
            [CRYPTOASSETS_STATE_KEY]: {
              favoriteAssets: [],
            },
          },
        }),
      ],
    });
    store = TestBed.inject(MockStore);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new CryptoAssetService(httpClientSpy, store);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get list of assets', (done) => {
    httpClientSpy.get.and.returnValue(of(assestsMock));
    service.getAssets().subscribe({
      next: (assets) => {
        expect(assets).toEqual(assestsMock);
        done();
      },
      error: done.fail,
    });
  });

  it('should dispatch `toggleCryptoAssetFavorite` action on calling `toggleAssetFavorite` method', () => {
    spyOn(store, 'dispatch');
    service.toggleAssetFavorite(assestsMock[0]);
    expect(store.dispatch).toHaveBeenCalledWith(
      CryptoAssetsAction.toggleCryptoAssetFavorite({
        params: {
          asset: {
            ...assestsMock[0],
            is_favorite: !assestsMock[0].is_favorite,
          },
        },
      })
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      CryptoAssetsAction.updateFavoriteAssets()
    );
  });
});
