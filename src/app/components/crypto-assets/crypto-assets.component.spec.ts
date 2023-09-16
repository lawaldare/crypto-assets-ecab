import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CryptoAssetsComponent } from './crypto-assets.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ZoroModule } from 'src/app/zoro.module';

import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';

import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { CryptoAssetsAction } from 'src/app/state/crypto-assets.actions';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { CRYPTOASSETS_STATE_KEY } from 'src/app/state/crypto-assets.reducer';

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};

const icons: IconDefinition[] = Object.keys(antDesignIcons).map((key) => {
  const i = antDesignIcons[key];
  return i;
});

const assestsMock = [
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

describe('CryptoAssetsComponent', () => {
  let component: CryptoAssetsComponent;
  let fixture: ComponentFixture<CryptoAssetsComponent>;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CryptoAssetsComponent],
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
    fixture = TestBed.createComponent(CryptoAssetsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show an `alertMessage` from service when there is no assets', async () => {
    fixture.detectChanges();
    const h3 = fixture.debugElement.nativeElement.querySelector('h3');
    expect(h3).toBeTruthy();
  });

  it('should show NOT an `alertMessage` from service when there are assets', async () => {
    store.setState({
      [CRYPTOASSETS_STATE_KEY]: {
        assets: assestsMock,
      },
    });
    fixture.detectChanges();
    const h3 = fixture.debugElement.nativeElement.querySelector('h3');
    expect(h3).toBeFalsy();
  });

  it('should show table data component button when there are assets', async () => {
    store.setState({
      [CRYPTOASSETS_STATE_KEY]: {
        assets: assestsMock,
      },
    });
    fixture.detectChanges();
    const table = fixture.debugElement.nativeElement.querySelector(
      'app-table-data'
    );
    expect(table).toBeTruthy();
  });

  it('should filter `assets` with respect to what user types in the input field', async () => {
    store.setState({
      [CRYPTOASSETS_STATE_KEY]: {
        assets: assestsMock,
      },
    });

    fixture.detectChanges();

    const inputElement = fixture.debugElement.nativeElement.querySelector(
      'input'
    );

    inputElement.value = 'bit';

    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    console.log(component.assets);

    expect(component.assets?.length).toBe(1);
  });
});
