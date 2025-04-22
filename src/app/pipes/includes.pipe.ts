import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'pipeIncludes', standalone: true })
export class PipeIncludes implements PipeTransform {
  transform(content: string | string[], searchText: string): boolean {
    return content?.includes(searchText);
  }
}
