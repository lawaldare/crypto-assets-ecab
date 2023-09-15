import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { CryptoAsset } from 'src/app/crypto-assets/models/crypto-asset';
import { CryptoAssetsState } from 'src/app/crypto-assets/state/crypto-assets.model';

@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.scss'],
})
export class TableDataComponent {
  @Input() assets: CryptoAsset[] = [];
  @Output() assetFavoriteToggled: EventEmitter<
    CryptoAsset
  > = new EventEmitter();

  constructor(private store: Store<CryptoAssetsState>) {}

  toggle(asset: CryptoAsset) {
    this.assetFavoriteToggled.emit(asset);
  }
}
