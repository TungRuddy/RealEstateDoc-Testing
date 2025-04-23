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
import { ActivatedRoute, Router } from '@angular/router';
import { MatDrawer } from '@angular/material/sidenav';
import { HelperService } from '../services/helper.service';
import { DialogConfirmComponent } from '../share/dialog-confirm/dialog-confirm.component';

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

  rowSelected!: ITEM;

  readonly itemsService = inject(ItemsService);
  readonly notifyService = inject(NotifyService);
  readonly helper = inject(HelperService);
  readonly dialog = inject(MatDialog);
  readonly router = inject(Router);

  @ViewChild('drawer') drawer!: MatDrawer;

  constructor(private cd: ChangeDetectorRef) {
    if (this.subData) this.subData.unsubscribe();

    this.subData = this.itemsService.getData().subscribe((res) => {
      if (res) {
        this.dataSource.data[
          this.dataSource.data.findIndex((f) => f && f.id === res.id)
        ] = res;
        this.dataSource._updateChangeSubscription();
        this.cd.markForCheck();
      }
    });
  }
  ngOnInit(): void {
    this.getData();
  }
  ngAfterViewInit(): void {}
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

  close() {
    this.drawer?.close();
    if (this.rowSelected && this.rowSelected.id) {
      this.helper.removeIdFromRoute(this.rowSelected.id, this.router);
    }
  }

  delete(){
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: {
        title: 'Confirm Delete item',
        content: `Are you sure you want to delete item: ${this.rowSelected?.name || this.rowSelected?.id}?`,
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.itemsService.delete(this.rowSelected).subscribe((res2) => {
          if (res2) {
            this.notifyService.sendData('Deleted successfully!');
            this.dataSource.data.splice(this.dataSource.data.findIndex((f) => f && f.id === this.rowSelected.id), 1);
            this.dataSource._updateChangeSubscription();
            this.cd.markForCheck();
            this.close();
          } else {
            this.notifyService.sendData('Cant delete item!');
          }
        });
      }
    });
  }
}
