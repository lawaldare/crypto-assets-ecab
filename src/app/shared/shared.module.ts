import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableDataComponent } from './table-data/table-data.component';
import { ZoroModule } from '../zoro.module';

@NgModule({
  declarations: [TableDataComponent],
  imports: [CommonModule, ZoroModule],
  exports: [TableDataComponent],
})
export class SharedModule {}
