import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CheckboxModel } from '../../../core/models/CheckboxModel';

@Component({
  selector: 'app-custom-checkbox',
  templateUrl: './custom-checkbox.component.html',
  styleUrls: ['./custom-checkbox.component.scss']
})
export class CustomCheckboxComponent {

  @Input() model: CheckboxModel<any>;
  @Input() labelProperty: string;

  @Output() checkedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
   * Get label by property if model is object
   * WARNING: Currently I am using label as id, but this is not the best idea, because it's not unique,
   * Math.rand() is also not the best, an id would be better in the model or it could work with lodash well: _.uniqueId('checkbox')
   */
  get label(): string {
    return this.labelProperty && this.model.value.hasOwnProperty(this.labelProperty) ?
      this.model.value[this.labelProperty] : this.model.value;
  }

  onCheckChange(checked: boolean): void {
    this.checkedChange.emit(checked);
  }

}
