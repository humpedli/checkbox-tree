import { inject, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AnimalService } from './animal.service';
import { HttpClient } from '@angular/common/http';
import { TreeData } from '../models/TreeData';
import { of } from 'rxjs';

describe('AnimalService', () => {
  let animalService: AnimalService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [AnimalService],
        schemas: [NO_ERRORS_SCHEMA],
      });
    }),
  );

  beforeEach(
    waitForAsync(
      inject([AnimalService], (service: AnimalService) => {
        animalService = service;
      }),
    ),
  );

  it(
    'should have getAnimals function',
    waitForAsync(
      inject([HttpClient], (httpClient: HttpClient) => {
        // Arrange
        const mockTreeData: TreeData<string> = new TreeData<string>(
          'node1'
        );
        spyOn(httpClient, 'get').and.returnValue(of(mockTreeData));

        // Act
        animalService.getAnimals().subscribe();

        // Assert
        expect(httpClient.get).toHaveBeenCalledWith('assets/mock/animals.json');
      }),
    ),
  );
});
