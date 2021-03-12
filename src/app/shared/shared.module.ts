import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomCheckboxComponent } from './components/custom-checkbox/custom-checkbox.component';
import { CheckboxTreeComponent } from './components/checkbox-tree/checkbox-tree.component';

@NgModule({
  declarations: [
    CustomCheckboxComponent,
    CheckboxTreeComponent,
  ],
  providers: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    CustomCheckboxComponent,
    CheckboxTreeComponent,
  ],
  entryComponents: [],
})
export class SharedModule {}
