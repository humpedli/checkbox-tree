import { TreeData } from './TreeData';
import { CheckboxModel } from './CheckboxModel';

export class CheckboxTreeModel<T> {
  constructor(public model: CheckboxModel<T>, public children: CheckboxTreeModel<T>[] = [], public parent: CheckboxTreeModel<T> = null) {
  }

  static createTreeModel<T>(tree: TreeData<T>): CheckboxTreeModel<T> {
    const node = new CheckboxTreeModel<T>(new CheckboxModel<T>(tree.data));

    if (tree.children) {
      for (const child of tree.children) {
        node.addChild(this.createTreeModel(child));
      }
    }

    return node;
  }

  isRoot(): boolean {
    return !this.parent;
  }

  hasChildren(): boolean {
    return this.children.length > 0;
  }

  addChild(child: CheckboxTreeModel<T>): void {
    child.parent = this;
    this.children.push(child);
  }

  setChecked(checked: boolean): void {
    this.setParentChecked(checked);
    this.setChildChecked(checked);
  }

  setParentChecked(checked: boolean): void {
    if (!this.isRoot()) {
      if (checked) {
        checked = this.parent.children.reduce(
          ((accumulator: boolean, currentValue: CheckboxTreeModel<T>) => accumulator && currentValue.model.checked),
          true
        );
      }

      this.parent.model.checked = checked;
      this.parent.setParentChecked(checked);
    }
  }

  setChildChecked(checked: boolean): void {
    this.model.checked = checked;

    if (this.hasChildren()) {
      this.children.forEach((child: CheckboxTreeModel<T>) => child.setChildChecked(checked));
    }
  }
}
