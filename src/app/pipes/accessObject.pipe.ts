import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'pipeAccessObject', standalone: true })
export class PipeAccessObject implements PipeTransform {
  transform(obj: any, path: string, value?: any) {
    if (value !== undefined) {
      var schema = obj; // a moving reference to internal objects within obj
      var pList = path.split('.');
      var len = pList.length;
      for (var i = 0; i < len - 1; i++) {
        var elem = pList[i];
        if (!schema[elem]) schema[elem] = {};
        schema = schema[elem];
      }

      schema[pList[len - 1]] = value;
    } else {
      var result = path?.split('.').reduce(function (prev, curr) {
        if (curr.includes('[0]')) {
          return prev ? prev[curr.replace('[0]', '')][0] : null;
        } else {
          return prev ? prev[curr] : null;
        }
      }, obj || self);
      if (result !== undefined && result !== null) {
        return result;
      } else {
        return '';
      }
    }
  }
}
