import { TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CheckboxTreeComponent } from './checkbox-tree.component';
import { CheckboxTreeModel } from '../../../core/models/CheckboxTreeModel';
import { TreeData } from '../../../core/models/TreeData';

const mockTreeData: TreeData<string> = new TreeData<string>(
  'node1',
  [
    {
      data: 'node21',
      children: [
        {
          data: 'node3'
        }
      ]
    },
    {
      data: 'node22'
    }
  ]
);

describe('CheckboxTreeComponent', () => {
  let component: CheckboxTreeComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [
        CheckboxTreeComponent
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
  });

  beforeEach(
    waitForAsync(() => {
      component = TestBed.createComponent(CheckboxTreeComponent).componentInstance;
    })
  );

  it('should createTreeModel create a valid tree data structure and isRoot, hasChildren and addChild functions should work well',
    waitForAsync(() => {
      // Act
      const tree = CheckboxTreeModel.createTreeModel(mockTreeData);

      // Assert
      expect(tree.model.value).toEqual('node1');
      expect(tree.isRoot()).toBeTrue();
      expect(tree.hasChildren()).toBeTrue();
      expect(tree.children[0].model.value).toEqual('node21');
      expect(tree.children[0].parent.model.value).toEqual('node1');
      expect(tree.children[0].children[0].model.value).toEqual('node3');
      expect(tree.children[0].children[0].parent.model.value).toEqual('node21');
      expect(tree.children[1].model.value).toEqual('node22');
      expect(tree.children[1].parent.model.value).toEqual('node1');
    })
  );

  it('should get tree leaves',
    waitForAsync(() => {
      // Arrange
      const tree = CheckboxTreeModel.createTreeModel(mockTreeData);

      // Act
      const leaves = tree.getLeaves();

      // Assert
      expect(leaves.length).toBe(2);
      expect(leaves[0].value).toEqual('node3');
      expect(leaves[1].value).toEqual('node22');
    })
  );

  it('should check work on corresponding elements',
    waitForAsync(() => {
      // Arrange
      const tree = CheckboxTreeModel.createTreeModel(mockTreeData);

      // Act
      tree.children[0].setChecked(true);
      tree.children[1].setChecked(true);
      tree.children[1].setChecked(false);

      // Assert
      expect(tree.model.checked).toBeFalse();
      expect(tree.children[0].children[0].model.checked).toBeTrue();
    })
  );

  it('should component setChecked method call trigger node setChecked function',
    waitForAsync(() => {
      // Arrange
      const tree = CheckboxTreeModel.createTreeModel(mockTreeData);
      component.node = tree;
      spyOn(component.node, 'setChecked').and.callThrough();

      // Act
      component.setChecked(true);

      // Assert
      expect(component.node.setChecked).toHaveBeenCalledWith(true);
      expect(component.node.model.checked).toBeTrue();
    })
  );
});
