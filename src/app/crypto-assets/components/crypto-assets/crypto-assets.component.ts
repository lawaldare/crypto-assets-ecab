import { Component, OnInit } from '@angular/core';
import { CryptoAssetService } from '../../services/asset.service';
import { Store } from '@ngrx/store';
import { CryptoAssetsState } from '../../state/crypto-assets.model';
import { CryptoAssetsAction } from '../../state/crypto-assets.actions';
import { CryptoAssetsSelectors } from '../../state/crypto-assets.selectors';
import { CryptoAsset } from '../../models/crypto-asset';
import { FormControl } from '@angular/forms';
import {
  Subject,
  debounceTime,
  distinctUntilChanged,
  filter,
  mergeMap,
  take,
  takeUntil,
} from 'rxjs';
import { concatLatestFrom } from '@ngrx/effects';

@Component({
  selector: 'app-assets',
  templateUrl: './crypto-assets.component.html',
  styleUrls: ['./crypto-assets.component.scss'],
})
export class CryptoAssetsComponent implements OnInit {
  assets: CryptoAsset[] | undefined;
  readonly searchControl: FormControl = new FormControl();
  private readonly ngOnDestroy$ = new Subject<void>();

  constructor(
    private store: Store<CryptoAssetsState>,
    private cryptoAssetsService: CryptoAssetService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(CryptoAssetsAction.getCryptoAssets());

    this.store
      .select(CryptoAssetsSelectors.assets)
      .pipe(
        filter((assets) => !!assets),
        takeUntil(this.ngOnDestroy$)
      )
      .subscribe((assets) => {
        this.assets = assets;
      });

    this.searchControl.valueChanges
      .pipe(
        debounceTime(250),
        distinctUntilChanged(),
        concatLatestFrom(() => this.store.select(CryptoAssetsSelectors.assets)),
        takeUntil(this.ngOnDestroy$)
      )
      .subscribe(([value, assets]) => {
        if (value) {
          this.assets = assets?.filter(
            (asset) =>
              asset.name
                .toLocaleLowerCase()
                .indexOf(value.toLocaleLowerCase()) !== -1
          );
        } else {
          this.assets = assets;
        }
      });
  }

  toggleAsset(asset: CryptoAsset) {
    this.searchControl.reset();
    this.cryptoAssetsService.toggleAssetFavorite(asset);
  }
}
