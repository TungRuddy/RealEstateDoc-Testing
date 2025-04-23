import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedocAutocompleteComponent } from './redoc-autocomplete.component';

describe('RedocAutocompleteComponent', () => {
  let component: RedocAutocompleteComponent;
  let fixture: ComponentFixture<RedocAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RedocAutocompleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedocAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
