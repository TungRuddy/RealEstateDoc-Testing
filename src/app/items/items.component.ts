import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MaterialImports } from '../materials.module';
import { ItemsService } from '../services/items.service';
import { MatTableDataSource } from '@angular/material/table';
import { ITEM } from '../models/items.model';
import { SharingImports } from '../sharing.module';
import { RedocTableComponent } from '../share/redoc-table/redoc-table.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ItemsAddComponent } from './items-add/items-add.component';
import { NotifyService } from '../services/notify.service';
import { COLUMN, createColumn } from '../models/column.model';
import { DATE } from '../models/variables.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-items',
  imports: [
    MaterialImports,
    SharingImports,
    MatDialogModule,
    RedocTableComponent,
  ],
  templateUrl: './items.component.html',
  styleUrl: './items.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemsComponent implements OnInit, AfterViewInit, OnDestroy {
  columns: Array<COLUMN> = [
    createColumn({
      name: 'created',
      colname_user: '',
      colname: 'Created',
      type: 'datetime',
      format: DATE.format.datetime,
      width: '150px',
    }),
    createColumn({
      name: 'name',
      colname_user: '',
      colname: 'Item name',
      width: '210px',
    }),
    createColumn({
      name: 'sku',
      colname_user: '',
      colname: 'Sku',
    }),
    createColumn({
      name: 'type',
      colname_user: '',
      colname: 'Type',
    }),
    createColumn({
      name: 'price',
      colname_user: '',
      colname: 'Price',
      type: 'number',
    }),
    createColumn({
      name: 'itemcategoryname',
      colname_user: '',
      colname: 'Category',
      special_key: 'itemcategory.name',
      width: '210px',
    }),
  ];
  dataSource: MatTableDataSource<ITEM> = new MatTableDataSource<ITEM>([]);

  query = {
    filters: { limit: 1, page: 1, q: '' },
  };

  sub!: Subscription;
  subData!: Subscription;

  readonly itemsService = inject(ItemsService);
  readonly notifyService = inject(NotifyService);
  readonly dialog = inject(MatDialog);

  @ViewChild("drawer") drawer!: MatDrawer;

  constructor(
    private cd: ChangeDetectorRef,
  ) {
    if (this.subData) this.subData.unsubscribe();

    this.subData = this.itemsService.getData().subscribe((res) => {
      if (res) {
        this.dataSource.data[this.dataSource.data.findIndex((f) => f && f.id === res.id)] = res;
        this.dataSource._updateChangeSubscription();
        this.cd.detectChanges();
      }
    });
  }
  ngOnInit(): void {
    this.getData();
  }
  ngAfterViewInit(): void {

  }
  ngOnDestroy(): void {}

  addItem() {
    const dialogRef = this.dialog.open(ItemsAddComponent, {
      data: null,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.dataSource.data.unshift(res);
        this.dataSource._updateChangeSubscription();
        this.cd.detectChanges();
      }
    });
  }

  getData() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    this.sub = this.itemsService.query(this.query).subscribe((res) => {
      if (res) {
        this.dataSource = new MatTableDataSource<ITEM>(res);
        this.cd.detectChanges();
      }
    });
  }
}
