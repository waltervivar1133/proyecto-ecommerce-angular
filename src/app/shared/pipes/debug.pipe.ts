import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'debug',
  standalone: true,
  pure: false,
})
export class DebugPipe implements PipeTransform {
  transform<T>(value: T, prefix = ''): T {
    console.log(`[DebugPipe${prefix ? ' ' + prefix : ''}]`, value);
    return value;
  }
}
