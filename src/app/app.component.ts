import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AnimalService } from './core/services/animal.service';
import { ColorService } from './core/services/color.service';
import { CheckboxTreeModel } from './core/models/CheckboxTreeModel';
import { ColorDefinition } from './core/models/ColorDefinition';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {

  animals: CheckboxTreeModel<string>;
  colors: CheckboxTreeModel<ColorDefinition>;

  constructor(private animalService: AnimalService, private colorService: ColorService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.getAnimalTree();
    this.getColorTree();
  }

  getAnimalTree(): void {
    this.animalService.getAnimals().subscribe((animals: CheckboxTreeModel<string>) => {
      this.animals = animals;
      this.cdr.markForCheck();
    });
  }

  getColorTree(): void {
    this.colorService.getColors().subscribe((colors: CheckboxTreeModel<ColorDefinition>) => {
      this.colors = colors;
      this.cdr.markForCheck();
    });
  }

}
