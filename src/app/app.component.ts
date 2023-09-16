import { Component, OnInit } from '@angular/core';
import { CryptoAssetsState } from './state/crypto-assets.model';
import { Store } from '@ngrx/store';
import { CryptoAssetsAction } from './state/crypto-assets.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store<CryptoAssetsState>) {}

  ngOnInit(): void {
    this.store.dispatch(CryptoAssetsAction.getCryptoAssets());
  }
}
