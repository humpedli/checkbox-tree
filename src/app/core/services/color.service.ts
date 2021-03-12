import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CheckboxTreeModel } from '../models/CheckboxTreeModel';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ColorDefinition } from '../models/ColorDefinition';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor(private httpClient: HttpClient) {
  }

  getColors(): Observable<CheckboxTreeModel<ColorDefinition>> {
    const url = 'assets/mock/colors.json';

    return this.httpClient.get(url)
      .pipe(map(data => CheckboxTreeModel.createTreeModel<ColorDefinition>(data)));
  }

}
