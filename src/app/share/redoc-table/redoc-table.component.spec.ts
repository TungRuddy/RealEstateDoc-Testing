import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedocTableComponent } from './redoc-table.component';

describe('RedocTableComponent', () => {
  let component: RedocTableComponent;
  let fixture: ComponentFixture<RedocTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RedocTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedocTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
