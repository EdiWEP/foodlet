import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-recipeingredient',
  templateUrl: './recipeingredient.component.html',
  styleUrls: ['./recipeingredient.component.scss']
})
export class RecipeingredientComponent implements OnInit {

  @Input() name!: string;
  @Input() grams!: string;
  @Output() removed = new EventEmitter<string>();

  
  constructor() { }

  ngOnInit(): void {
  }

  public remove() {
    this.removed.emit(this.name);
  }

}
