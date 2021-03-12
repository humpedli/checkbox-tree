import { TreeData } from './TreeData';
import { CheckboxModel } from './CheckboxModel';

export class CheckboxTreeModel<T> {
  constructor(public model: CheckboxModel<T>, public children: CheckboxTreeModel<T>[] = [], public parent: CheckboxTreeModel<T> = null) {
  }

  /**
   * Create the tree model with checkbox models based on tree data
   */
  static createTreeModel<T>(tree: TreeData<T>): CheckboxTreeModel<T> {
    const node = new CheckboxTreeModel<T>(new CheckboxModel<T>(tree.data));

    if (tree.children) {
      for (const child of tree.children) {
        node.addChild(this.createTreeModel(child));
      }
    }

    return node;
  }

  /**
   * Is it the top element or not?
   */
  isRoot(): boolean {
    return !this.parent;
  }

  /**
   * Has the node any child element or is it a leaf?
   */
  hasChildren(): boolean {
    return this.children.length > 0;
  }

  /**
   * Add a new child to the current node
   * Set child's parent to this node for easier walking
   */
  addChild(child: CheckboxTreeModel<T>): void {
    child.parent = this;
    this.children.push(child);
  }

  /**
   * Get tree leaves as array (nodes without children)
   */
  getLeaves(leaves: Array<CheckboxModel<T>> = []): Array<CheckboxModel<T>> {
    if (this.hasChildren()) {
      return this.children.reduce((acc: Array<CheckboxModel<T>>, x: CheckboxTreeModel<T>) => acc.concat(x.getLeaves(leaves)), []);
    } else {
      return [this.model];
    }
  }

  /**
   * Set checked statuses for all other checkboxes in both directions (up and down in the tree)
   */
  setChecked(checked: boolean): void {
    this.setParentChecked(checked);
    this.setChildChecked(checked);
  }

  /**
   * Set parent group checked statuses based on child checkboxes
   * If all checkbox is checked then parent group checkbox are also checked, if not, clear checked status
   */
  setParentChecked(checked: boolean): void {
    if (!this.isRoot()) {
      if (checked) {
        checked = this.parent.children.reduce(((acc: boolean, x: CheckboxTreeModel<T>) => acc && x.model.checked), true);
      }

      this.parent.model.checked = checked;
      this.parent.setParentChecked(checked);
    }
  }

  /**
   * Set all child checked status
   * If a group element is clicked then all child checkbox should be checked (or unchecked) based on group status
   */
  setChildChecked(checked: boolean): void {
    this.model.checked = checked;

    if (this.hasChildren()) {
      this.children.forEach((child: CheckboxTreeModel<T>) => child.setChildChecked(checked));
    }
  }
}
