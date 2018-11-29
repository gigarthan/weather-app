import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the DefaultPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'default',
  pure: true
})
export class DefaultPipe implements PipeTransform {
  /**
   * Takes a value and sets a default value if nothing is provided.
   */
  transform(value: any, defaultValue: any): any {
    return value || defaultValue;
}
}
