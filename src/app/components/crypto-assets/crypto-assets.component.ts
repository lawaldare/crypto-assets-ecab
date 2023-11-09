import { Component, OnDestroy, OnInit } from '@angular/core';
import { CryptoAssetService } from '../../services/asset.service';
import { Store } from '@ngrx/store';
import { CryptoAssetsState } from '../../state/crypto-assets.model';
import { CryptoAssetsSelectors } from '../../state/crypto-assets.selectors';
import { FormControl } from '@angular/forms';
import {
  Subject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  filter,
  takeUntil,
} from 'rxjs';
import { concatLatestFrom } from '@ngrx/effects';
import { CryptoAsset } from 'src/app/models/crypto-asset';
import { CryptoAssetsAction } from 'src/app/state/crypto-assets.actions';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-assets',
  templateUrl: './crypto-assets.component.html',
  styleUrls: ['./crypto-assets.component.scss'],
})
export class CryptoAssetsComponent implements OnInit, OnDestroy {
  assets: CryptoAsset[] | undefined;
  readonly searchControl: FormControl = new FormControl();
  private readonly ngOnDestroy$ = new Subject<void>();

  constructor(
    private store: Store<CryptoAssetsState>,
    public cryptoAssetsService: CryptoAssetService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.store.select(CryptoAssetsSelectors.assets),
      this.route.queryParams,
    ])
      .pipe(takeUntil(this.ngOnDestroy$))
      .subscribe(([assets, query]) => {
        this.assets = assets;
        const search = query['search'];
        if (search) {
          this.searchControl.setValue(search);
          this.assets = this.filterItemsBySearchQuery(
            search,
            this.assets ?? []
          );
        }
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
          this.assets = this.filterItemsBySearchQuery(value, assets ?? []);
        } else {
          this.assets = assets;
        }
        this.implementSearchQuery();
      });
  }

  private implementSearchQuery() {
    if (this.searchControl.value) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          search: this.searchControl.value,
        },
        queryParamsHandling: 'merge',
      });
    } else {
      this.router.navigate([], {
        relativeTo: this.route,
      });
    }
  }

  private filterItemsBySearchQuery(searchQuery: string, items: any[]): any[] {
    return items.filter(
      (asset) =>
        asset.name
          .toLocaleLowerCase()
          .indexOf(searchQuery.toLocaleLowerCase()) !== -1
    );
  }

  toggleAsset(asset: CryptoAsset) {
    this.searchControl.reset();
    this.cryptoAssetsService.toggleAssetFavorite(asset);
  }

  sortAssetsByFavorite() {
    this.store.dispatch(CryptoAssetsAction.sortCryptoAssets());
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next();
    this.ngOnDestroy$.complete();
  }
}
