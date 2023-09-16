import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDataComponent } from './table-data.component';
import { provideMockStore } from '@ngrx/store/testing';
import { CRYPTOASSETS_STATE_KEY } from 'src/app/state/crypto-assets.reducer';
import { ZoroModule } from 'src/app/zoro.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';

import { NZ_ICONS } from 'ng-zorro-antd/icon';

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};

const icons: IconDefinition[] = Object.keys(antDesignIcons).map((key) => {
  const i = antDesignIcons[key];
  return i;
});

describe('TableDataComponent', () => {
  let component: TableDataComponent;
  let fixture: ComponentFixture<TableDataComponent>;

  const assetsMock = [
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
      id_icon: 'aaaaaaaaaaaaaaaa',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableDataComponent],
      imports: [ZoroModule, BrowserAnimationsModule],
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
    fixture = TestBed.createComponent(TableDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show load the table when there is `assets`', () => {
    component.assets = assetsMock;
    fixture.detectChanges();
    const tr = fixture.debugElement.nativeElement.querySelectorAll(
      'tbody > tr.ant-table-row'
    );
    expect(tr.length).toBe(1);
  });

  it('should call `toggle` method when the star icon is clicked', () => {
    component.assets = assetsMock;
    spyOn(component, 'toggle');
    fixture.detectChanges();
    const firstTableRow = fixture.debugElement.nativeElement.querySelectorAll(
      'tbody > tr.ant-table-row'
    )[0];
    const icon = firstTableRow.querySelector('td > span');
    icon.click();
    expect(component.toggle).toHaveBeenCalledWith(assetsMock[0]);
  });
});
