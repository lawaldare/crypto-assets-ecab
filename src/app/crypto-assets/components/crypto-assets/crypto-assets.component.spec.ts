import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsComponent } from './crypto-assets.component';

describe('AssetsComponent', () => {
  let component: AssetsComponent;
  let fixture: ComponentFixture<AssetsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssetsComponent],
    });
    fixture = TestBed.createComponent(AssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
