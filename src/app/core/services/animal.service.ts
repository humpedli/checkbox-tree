import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CheckboxTreeModel } from '../models/CheckboxTreeModel';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  constructor(private httpClient: HttpClient) {
  }

  getAnimals(): Observable<CheckboxTreeModel<string>> {
    const url = 'assets/mock/animals.json';

    return this.httpClient.get(url)
      .pipe(map(data => CheckboxTreeModel.createTreeModel<string>(data)));
  }

}
