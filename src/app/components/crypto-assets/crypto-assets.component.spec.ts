import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CryptoAssetsComponent } from './crypto-assets.component';

describe('CryptoAssetsComponent', () => {
  let component: CryptoAssetsComponent;
  let fixture: ComponentFixture<CryptoAssetsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CryptoAssetsComponent],
    });
    fixture = TestBed.createComponent(CryptoAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
