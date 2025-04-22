import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedocTableCellComponent } from './redoc-table-cell.component';

describe('RedocTableCellComponent', () => {
  let component: RedocTableCellComponent;
  let fixture: ComponentFixture<RedocTableCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RedocTableCellComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedocTableCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
