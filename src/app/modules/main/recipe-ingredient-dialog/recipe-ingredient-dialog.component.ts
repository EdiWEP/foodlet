import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IngredientService } from 'src/app/services/ingredient.service';

@Component({
  selector: 'app-recipe-ingredient-dialog',
  templateUrl: './recipe-ingredient-dialog.component.html',
  styleUrls: ['./recipe-ingredient-dialog.component.scss']
})
export class RecipeIngredientDialogComponent implements OnInit {

  public recipeIngredientForm : FormGroup = new FormGroup({
    name: new FormControl(''),
    grams: new FormControl('')
  });

  constructor(
    private ingredientService: IngredientService, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<RecipeIngredientDialogComponent>
  ) { }

  ngOnInit(): void {
  }

  public sendData() {
    if(this.recipeIngredientForm.value.name && this.recipeIngredientForm.value.grams) {


      for(let ingredient of this.data.ingredients) {
        if(ingredient.name == this.recipeIngredientForm.value.name) {
          
          var newIngredient : IngredientEntry = {
            id: ingredient.id ,
            name: ingredient.name,
            grams: this.recipeIngredientForm.value.grams,
          }
          console.log('y');
          console.log(newIngredient);
          this.dialogRef.close(newIngredient);
        }
      }
    }
    
    document.getElementById("message")!.innerText = "Ingredient not found";


  }
}

export interface IngredientEntry {
  id: string;
  name: string;
  grams: string;
}
