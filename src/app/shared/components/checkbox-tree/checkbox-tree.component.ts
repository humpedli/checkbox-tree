import { Component, Input } from '@angular/core';
import { CheckboxTreeModel } from '../../../core/models/CheckboxTreeModel';

@Component({
  selector: 'app-checkbox-tree',
  templateUrl: './checkbox-tree.component.html',
  styleUrls: ['./checkbox-tree.component.scss'],
})
export class CheckboxTreeComponent {

  @Input() node: CheckboxTreeModel<any>;
  @Input() labelProperty: string;

  setChecked(checked: boolean): void {
    this.node.setChecked(checked);
  }

}
