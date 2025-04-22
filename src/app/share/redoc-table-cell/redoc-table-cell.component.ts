import {
  AfterViewInit,
  Component,
  ContentChild,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatColumnDef, MatTable } from '@angular/material/table';
import { ResizableModule, ResizeEvent } from 'angular-resizable-element';
import { MaterialImports } from '../../materials.module';
import { SharingImports } from '../../sharing.module';
import { COLUMN } from '../../models/column.model';

@Component({
  selector: 'redoc-table-cell',
  imports: [
    MaterialImports,
    SharingImports,
    ResizableModule,
  ],
  templateUrl: './redoc-table-cell.component.html',
  styleUrl: './redoc-table-cell.component.scss',
})
export class RedocTableCellComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @Input() matColumnDefInput: string | any;

  @Input() column!: COLUMN;
  @Input() columnIndex: any;

  @Input() table!: MatTable<any>;

  resizeEdges = { right: true };

  @ContentChild(TemplateRef) templateRef!: TemplateRef<any>;
  @ViewChild(MatColumnDef) columnDef!: MatColumnDef;
  constructor(

  ) {}
  ngOnDestroy(): void {
    if (this.table && this.columnDef) {
      this.table.removeColumnDef(this.columnDef);
    }
  }
  ngAfterViewInit(): void {
    if (this.table && this.columnDef) {
      this.table.addColumnDef(this.columnDef);
    }
  }

  ngOnInit(): void {}

  validate(event: ResizeEvent): boolean {
    const MIN_DIMENSIONS_PX = 50; // resize min width column is 50px
    if (event.rectangle.width && event.rectangle.width < MIN_DIMENSIONS_PX) {
      return false;
    }
    return true;
  }

  resizeCol(e: ResizeEvent, key?: string) {
    if (key) {
      const cell = document.getElementById('CellHeader-' + key);
      if (cell) cell.style.background = 'unset';
    }
    this.column.width = `${e.rectangle.width}px`;
    this.column.styles['width'] = `${e.rectangle.width}px`;
  }

  resizingCol(e: ResizeEvent, key: string) {
    const cell = document.getElementById('CellHeader-' + key);
    if (key && cell) {
      cell.style.background = '#e1f5fe';
      cell.style.visibility = 'visible';
    }
    this.column.width = `${e.rectangle.width}px`;
    this.column.styles['width'] = `${e.rectangle.width}px`;
    this.column.styles = { ...this.column.styles };
  }
}
