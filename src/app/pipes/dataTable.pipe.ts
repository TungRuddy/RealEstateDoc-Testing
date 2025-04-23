import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
@Pipe({ 
  name: 'pipeDataTable', 
  standalone: true,
})
export class PipeDataTable implements PipeTransform {
  locale = 'vi-VN';
  constructor(
    private datePipe: DatePipe,
    private decimalPipe: DecimalPipe,
  ) {
    
  }

  transform(data: DataTableForPipe): string | any {
    if (data.type === 'datetime' && data.value) {

      if (typeof data.value === 'string') {
        return this.datePipe.transform(new Date(data.value), data.format, this.locale);
      } else if (data.value instanceof Date && !isNaN(data.value.getTime())) {
        return this.datePipe.transform(data.value, data.format, this.locale);
      } else {
        return data.value;
      }
    } else if (data.type === 'number') {
      return this.decimalPipe.transform(data.value, data.format);
    } else {
      return data.value;
    }
  }
}

export interface DataTableForPipe {
  type: string | undefined;
  value: any;
  format: string | undefined;
}
