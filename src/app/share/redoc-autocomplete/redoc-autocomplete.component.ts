import { AsyncPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Observable, startWith, map, filter } from 'rxjs';
import { MatAutocompleteModule, MatAutocompleteTrigger } from '@angular/material/autocomplete';

@Component({
  selector: 'redoc-autocomplete',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  templateUrl: './redoc-autocomplete.component.html',
  styleUrl: './redoc-autocomplete.component.scss',
})
export class RedocAutocompleteComponent {
  @Input() placeholder: string = '';
  @Input() service: any;
  @Input() bindingData: any;
  @Input() formClass!: string;

  @Output() onChange = new EventEmitter<any>();

  @ViewChild("trigger") trigger!: MatAutocompleteTrigger;

  myControl = new FormControl('');
  datas!: any[];
  filteredOptions!: Observable<any[]>;

  ngOnInit() {
    if (this.bindingData) {
      this.myControl.setValue(this.bindingData);
    }
  }

  async getData() {
    if (!this.datas && this.service) {
      this.datas = await this.service.query({ filters: {} }).toPromise();
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map((value: any) => {
          const name = typeof value === 'string' ? value : value?.name;
          return name ? this._filter(name as string) : this.datas.slice();
        })
      );
      if(this.trigger){
        this.trigger.openPanel();
      }
    }
  }

  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.datas.filter((data) =>
      data.name.toLowerCase().includes(filterValue)
    );
  }

  onSelect(event: any) {
    console.log(event);
    if(event && event.option){
      this.onChange.emit(event.option.value);
    }
  }

  displayFn(obj: any): string {
    return obj && obj.name ? obj.name : '';
  }
}
