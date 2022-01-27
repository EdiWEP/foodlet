import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipeingredient',
  templateUrl: './recipeingredient.component.html',
  styleUrls: ['./recipeingredient.component.scss']
})
export class RecipeingredientComponent implements OnInit {

  @Input() name!: string;
  @Input() grams!: string;

  
  constructor() { }

  ngOnInit(): void {
  }

}
