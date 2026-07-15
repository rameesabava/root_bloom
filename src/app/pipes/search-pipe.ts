import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(allPlants: any[], searchKey:string): any[] {
    let result:any = []
    if(!allPlants || searchKey==""){
      return allPlants
    }
    result = allPlants.filter((item:any)=>item.name.toLowerCase().includes(searchKey.toLowerCase()))
    return result
  }
}
