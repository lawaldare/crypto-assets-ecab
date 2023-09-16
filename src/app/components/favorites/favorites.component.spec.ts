import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { FavoritesComponent } from './favorites.component';
import { CRYPTOASSETS_STATE_KEY } from 'src/app/state/crypto-assets.reducer';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ZoroModule } from 'src/app/zoro.module';

import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';

import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { CryptoAssetsAction } from 'src/app/state/crypto-assets.actions';

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};

const icons: IconDefinition[] = Object.keys(antDesignIcons).map((key) => {
  const i = antDesignIcons[key];
  return i;
});

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;
  let store: MockStore;

  const favoriteAssetsMock = [
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
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavoritesComponent],
      imports: [
        HttpClientModule,
        ReactiveFormsModule,
        SharedModule,
        BrowserAnimationsModule,
        ZoroModule,
      ],
      providers: [
        provideMockStore({
          initialState: {
            [CRYPTOASSETS_STATE_KEY]: {
              favoriteAssets: [],
            },
          },
        }),
        {
          provide: NZ_ICONS,
          useValue: icons,
        },
      ],
    });
    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show `create your own favourite` button when there is no favorite assets', async () => {
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button');
    expect(button).toBeTruthy();
  });

  it('should show table data component button when there is favorite assets', async () => {
    store.setState({
      [CRYPTOASSETS_STATE_KEY]: {
        favoriteAssets: favoriteAssetsMock,
      },
    });
    fixture.detectChanges();
    const table = fixture.debugElement.nativeElement.querySelector(
      'app-table-data'
    );
    expect(table).toBeTruthy();
  });

  it('should dispatch `sortCryptoAssets` action on leaving that Favorite Page', () => {
    spyOn(store, 'dispatch');
    fixture.detectChanges();
    component.ngOnDestroy();
    expect(store.dispatch).toHaveBeenCalledWith(
      CryptoAssetsAction.sortCryptoAssets()
    );
  });
});
