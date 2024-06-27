import { Pipe, PipeTransform } from '@angular/core';
import numbro from 'numbro';
import esES from 'numbro/dist/languages/es-ES.min';

@Pipe({
  name: 'abbreviateNumber',
})
export class AbbreviateNumberPipe implements PipeTransform {
  constructor() {
    // Registrar y configurar el idioma español
    numbro.registerLanguage(esES);
    numbro.setLanguage('es-ES');
  }

  transform(value: number): string {
    return numbro(value)
      .format({
        average: true,
        mantissa: 1,
      })
      .toUpperCase();
  }
}
