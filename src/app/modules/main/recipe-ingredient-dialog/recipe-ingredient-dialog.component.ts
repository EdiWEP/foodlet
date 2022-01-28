import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IngredientService } from 'src/app/services/ingredient.service';
import { RecipeIngredientModel } from '../interfaces';

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
    if(this.recipeIngredientForm.value.name.trim() && this.recipeIngredientForm.value.grams.trim()) {

      var name = this.recipeIngredientForm.value.name;
      var grams = this.recipeIngredientForm.value.grams;

      var found : boolean = false;
      for(let ingredient of this.data.ingredients) {
        if(ingredient.name == name) {
          
          found = true;
          var alreadyUsed = false;

          for(let usedIngredient of this.data.currentIngredients) {
            if(usedIngredient.name == name) {
              alreadyUsed = true;
              break;
            }
          }

          if(alreadyUsed) {
            this.changeMessage("Ingredient already added");
          }
          else {

            var newIngredient : RecipeIngredientModel = {
              ingredientId: ingredient.id ,
              name: ingredient.name,
              grams: grams,
            }
            
            this.dialogRef.close(newIngredient);
          }
        }
      }
      if(!found){
        this.changeMessage("Ingredient not found");
      }
    }
    else {
      this.changeMessage("Please fill the form"); 
    }
    
  }

  private changeMessage(message : string) {
    document.getElementById("ingredient-message")!.innerText = message; 
  }
}

