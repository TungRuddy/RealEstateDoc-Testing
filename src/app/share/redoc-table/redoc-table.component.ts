import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MaterialImports } from '../../materials.module';
import { PipeIncludes } from '../../pipes/includes.pipe';
import { RedocTableCellComponent } from '../redoc-table-cell/redoc-table-cell.component';
import { COLUMN } from '../../models/column.model';
import { PipeAccessObject } from '../../pipes/accessObject.pipe';
import { PipeDataTable } from '../../pipes/dataTable.pipe';
import { SharingImports } from '../../sharing.module';
import { DatePipe, DecimalPipe } from '@angular/common';
import {
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  Subscription,
} from 'rxjs';
import { QueryList } from '../../models/variables.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'redoc-table',
  imports: [
    MaterialImports,
    SharingImports,
    RedocTableCellComponent,

    PipeIncludes,
    PipeDataTable,
    PipeAccessObject,
  ],
  providers: [DatePipe, DecimalPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './redoc-table.component.html',
  styleUrl: './redoc-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RedocTableComponent
  implements OnInit, AfterViewInit, OnDestroy, OnChanges
{
  displayedColumns: string[] = [];

  @Input() dataSource: MatTableDataSource<any> = new MatTableDataSource<any>(
    []
  );

  @Input() columns: Array<COLUMN> = [];
  @Input() query!: QueryList;
  @Input() route_key: string = '';

  @Output() add = new EventEmitter();
  @Output() refresh = new EventEmitter();
  @Output() rowClick = new EventEmitter();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('inputSearch') inputSearch!: ElementRef;

  subSearch!: Subscription;
  selectedRowID!: string;
  clientWidth: number;
  subResize!: Subscription;
  constructor(
    private cd: ChangeDetectorRef,
    private ngZone: NgZone,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.clientWidth = window.innerWidth;
    this.ngZone.runOutsideAngular(() => {
      this.subResize = fromEvent(window, 'resize')
        .pipe(debounceTime(300))
        .subscribe(() => {
          this.clientWidth = window.innerWidth;
          this.cd.detectChanges();
        });
    });
  }

  ngOnInit(): void {
    this.displayedColumns = this.columns
      .filter((f) => f?.status)
      .map((m) => m?.name);

    console.log(this.columns);
  }
  ngAfterViewInit(): void {
    this.updateSortPaginator();
    this.initSearch();
    this.checkIdHasOnRow();
    console.log(this.route, this.router);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    this.updateSortPaginator();
  }

  ngOnDestroy(): void {
    if (this.subResize) this.subResize.unsubscribe();

    if (this.subSearch) this.subSearch.unsubscribe();
  }

  checkIdHasOnRow() {
    const routeParts: string[] = this.router.url.split('/');
    this.selectedRowID =
      routeParts[routeParts.indexOf(this.route_key) + 1]?.split('?')[0];
    this.rowClick.emit({ id: this.selectedRowID });
  }

  updateSortPaginator() {
    if (this.sort) this.dataSource.sort = this.sort;

    if (this.paginator) this.dataSource.paginator = this.paginator;
  }

  initSearch() {
    if (this.subSearch) {
      this.subSearch.unsubscribe();
    }
    this.ngZone.runOutsideAngular(() => {
      if (this.inputSearch && this.inputSearch.nativeElement) {
        this.subSearch = fromEvent(this.inputSearch.nativeElement, 'keyup')
          .pipe(debounceTime(300), distinctUntilChanged())
          .subscribe(() => {
            this.query.filters.q = this.inputSearch.nativeElement?.value;
            // sau này có thể output query ra component chính để gọi api
            this.dataSource.filter = String(
              this.query.filters.q
            )?.toLowerCase();

            this.cd.detectChanges();
          });
      }
    });
  }

  openDetails(row: any) {
    console.log(row);
    this.selectedRowID = row.id;
    this.rowClick.emit(row);
    this.router.navigate([row.id], { relativeTo: this.route });
  }
}
