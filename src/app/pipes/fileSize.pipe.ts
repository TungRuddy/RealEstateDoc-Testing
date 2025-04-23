import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'pipeFileSize',
    standalone: true
})
export class PipeFileSize implements PipeTransform {
    sizes = ['Bytes', 'Kb', 'Mb', 'Gb', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    decimals = 2;
    k = 1024;
    transform(bytes: number, decimals?: number): string {
        if (bytes === 0) return '0 Bytes';

        if(decimals){
            this.decimals = decimals;
        }
        const dm = this.decimals < 0 ? 0 : this.decimals;
    
        const i = Math.floor(Math.log(bytes) / Math.log(this.k));
    
        return parseFloat((bytes / Math.pow(this.k, i)).toFixed(dm)) + ' ' + this.sizes[i];
    }

}

