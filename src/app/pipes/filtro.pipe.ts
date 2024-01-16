import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(listCitas: any[], page: number = 0): any[] {
    
    return listCitas?.slice(page,page+5);
  }

}
