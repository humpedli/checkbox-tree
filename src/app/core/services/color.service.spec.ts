import { inject, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { ColorService } from './color.service';

describe('ColorService', () => {
  let colorService: ColorService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [ColorService],
        schemas: [NO_ERRORS_SCHEMA],
      });
    }),
  );

  beforeEach(
    waitForAsync(
      inject([ColorService], (service: ColorService) => {
        colorService = service;
      }),
    ),
  );

  it(
    'should have getColors function',
    waitForAsync(
      inject([HttpClient], (httpClient: HttpClient) => {
        // Arrange
        spyOn(httpClient, 'get').and.callThrough();

        // Act
        colorService.getColors().subscribe();

        // Assert
        expect(httpClient.get).toHaveBeenCalledWith('assets/mock/colors.json');
      }),
    ),
  );
});
