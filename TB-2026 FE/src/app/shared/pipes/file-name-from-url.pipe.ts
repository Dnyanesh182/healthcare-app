import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileNameFromUrl',
  standalone: true
})
export class FileNameFromUrlPipe implements PipeTransform {
  transform(filePath: string): string {
    if (!filePath) return '';
    const fileName = filePath.substring(filePath.lastIndexOf('/') + 1);
    // Remove _YYYYMMDD_HHMMSS before .pdf if present
    return fileName.replace(/(_\d{8}_\d{6})\.pdf$/, '.pdf');
  }
}