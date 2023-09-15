import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';

@NgModule({
  exports: [
    NzTableModule,
    NzIconModule,
    NzLayoutModule,
    NzToolTipModule,
    NzButtonModule,
    NzInputModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ZoroModule {}
