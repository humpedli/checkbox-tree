import { inject, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AnimalService } from './core/services/animal.service';
import { of } from 'rxjs';
import { CheckboxTreeModel } from './core/models/CheckboxTreeModel';
import { CheckboxModel } from './core/models/CheckboxModel';
import { ColorService } from './core/services/color.service';
import { ColorDefinition } from './core/models/ColorDefinition';

describe('AppComponent', () => {
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
  });

  beforeEach(
    waitForAsync(() => {
      component = TestBed.createComponent(AppComponent).componentInstance;
    })
  );

  it('should initialize the component',
    waitForAsync(() => {
      // Arrange
      spyOn(component, 'getAnimalTree');
      spyOn(component, 'getColorTree');

      // Act
      component.ngOnInit();

      // Assert
      expect(component.getAnimalTree).toHaveBeenCalled();
      expect(component.getColorTree).toHaveBeenCalled();
    })
  );

  it('should getAnimalTree set animals',
    waitForAsync(
      inject([AnimalService], (animalService: AnimalService) => {
        // Arrange
        const animalTree = new CheckboxTreeModel<string>(new CheckboxModel<string>('test'));
        spyOn(animalService, 'getAnimals').and.returnValue(of(animalTree));

        // Act
        component.getAnimalTree();

        // Assert
        expect(component.animals.model.value).toEqual('test');
      })
    )
  );

  it('should getColorTree set colors',
    waitForAsync(
      inject([ColorService], (colorService: ColorService) => {
        // Arrange
        const colorTree = new CheckboxTreeModel<ColorDefinition>(new CheckboxModel<ColorDefinition>(new ColorDefinition('test', '#000')));
        spyOn(colorService, 'getColors').and.returnValue(of(colorTree));

        // Act
        component.getColorTree();

        // Assert
        expect(component.colors.model.value.name).toEqual('test');
      })
    )
  );
});
