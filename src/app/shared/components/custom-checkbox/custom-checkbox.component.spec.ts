import { TestBed, waitForAsync } from '@angular/core/testing';
import { CustomCheckboxComponent } from './custom-checkbox.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CheckboxModel } from '../../../core/models/CheckboxModel';

class MockData {
  constructor(public name?: string, public value?: number) {
  }
}

describe('CustomCheckboxComponent', () => {
  let component: CustomCheckboxComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [
        CustomCheckboxComponent
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
  });

  beforeEach(
    waitForAsync(() => {
      component = TestBed.createComponent(CustomCheckboxComponent).componentInstance;
    })
  );

  it('should get the label by labelProperty',
    waitForAsync(() => {
      // Arrange
      const data = new MockData('test', 1);
      component.labelProperty = 'name';
      component.model = new CheckboxModel<MockData>(data, false);

      // Act
      const label = component.label;

      // Assert
      expect(label).toEqual('test');
    })
  );

  it('should get the label without labelProperty',
    waitForAsync(() => {
      // Arrange
      const data = 'test';
      component.labelProperty = undefined;
      component.model = new CheckboxModel<string>(data, false);

      // Act
      const label = component.label;

      // Assert
      expect(label).toEqual('test');
    })
  );

  it('should onCheckChange function trigger checkedChange event emitter',
    waitForAsync(() => {
      // Arrange
      spyOn(component.checkedChange, 'emit');

      // Act
      component.onCheckChange(true);

      // Assert
      expect(component.checkedChange.emit).toHaveBeenCalledWith(true);
    })
  );
});
