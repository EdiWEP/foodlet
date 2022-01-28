import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IngredientService } from 'src/app/services/ingredient.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { Ingredient, RecipeIngredient, RecipeIngredientModel, RecipeModel } from '../interfaces';
import { RecipeIngredientDialogComponent } from '../recipe-ingredient-dialog/recipe-ingredient-dialog.component';


@Component({
  selector: 'app-recipe-dialog',
  templateUrl: './recipe-dialog.component.html',
  styleUrls: ['./recipe-dialog.component.scss']
})
export class RecipeDialogComponent implements OnInit {

  public divideFactor: number = 100;
  public message: string = '';

  public ingredients!: Ingredient[];
  public recipeIngredients: RecipeIngredientModel[] = [] as RecipeIngredientModel[];;

  public recipeForm : FormGroup = new FormGroup({
    name: new FormControl(''),
    servingSize: new FormControl(''),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private recipeService: RecipeService,
    private ingredientService: IngredientService,
    public dialogRef: MatDialogRef<RecipeDialogComponent>,
    private dialog : MatDialog
  ) { }

  ngOnInit(): void {

    this.recipeIngredients = [];
    this.ingredientService.getIngredients().subscribe({
      next: (result) => {
        
        this.ingredients = result;
      },
      error: (error) => {
        console.error(error);
      }
    })

    if(this.data.action == 'edit') {
      this.recipeForm.patchValue(this.data.formValue);

      this.recipeIngredients = this.data.formValue.ingredients;

    }
  }

  public openIngredientDialog() {
    const dialogRef = 
    this.dialog.open(RecipeIngredientDialogComponent, 
      {
        width:"35vw", 
        height:"30vh", 
        data: {
          currentIngredients: this.recipeIngredients,
          ingredients: this.ingredients,
        }
      });
    
    dialogRef.afterClosed().subscribe({
      next : (result) => {
        if(result) {
          
          var newIng : RecipeIngredientModel = result;
          this.recipeIngredients.push(newIng);
        }
      },
      error: (error) => {
        console.error(error);
      }
    });


  }

  public sendData() {

    if(this.recipeForm.value.name.trim() == '' || ( this.recipeForm.value.servingSize == '' || this.recipeForm.value.servingSize.toString().trim() == '')) {
      this.changeMessage("Please fill the form");
    }
    else {
      if(this.recipeIngredients.length < 2) {
        this.changeMessage("Please add at least two ingredients");
      }
      else {
        var recipe = this.createRecipe(
          this.recipeForm.value.name, 
          this.recipeForm.value.servingSize, 
          this.recipeIngredients.length
        );

        if(this.data.action == 'add') {

          this.recipeService.addRecipe(recipe).subscribe({
            next: (result) => {
              this.dialogRef.close("success");
            },
            error: (error) => {
              console.error(error);
              this.changeMessage("Failed to add recipe");
              
            }
          }); 
        }
        else {
          console.log(recipe);
          console.log(this.recipeIngredients);
          recipe.id = this.data.formValue.id;

          this.recipeService.updateRecipe(recipe).subscribe({
            next: (result) => {
              this.dialogRef.close("success");
            },
            error: (error) => {
              console.error(error);
              this.changeMessage("Failed to edit recipe");
              
            }
          }); 
        }
      }
    }


  }

  public removeIngredient(removedName: string) {
    this.recipeIngredients = 
      this.recipeIngredients.filter((ingredient) => ingredient.name != removedName);
  }

  private createRecipe(name: string, servingSize: number, numberOfIngredients: number) : RecipeModel {
    
    var ingredients : RecipeIngredient[] = [];
    this.recipeIngredients.forEach(ingredient => {
      ingredients.push(this.ingredientFromModel(ingredient));
    });

    var userId = localStorage.getItem('UserId')!;

    var recipe : RecipeModel = {
      id: '',
      name: name,
      userId: userId,
      numberOfIngredients: numberOfIngredients,
      servingSize: servingSize,
      ingredients: ingredients,
    }

    return recipe;
  }

  private ingredientFromModel(model : RecipeIngredientModel) : RecipeIngredient {
    var newIngredient : RecipeIngredient = {
      ingredientId: model.ingredientId,
      grams: model.grams,
    }

    return newIngredient;
  }

  private changeMessage(message : string) {
    document.getElementById("message")!.innerText = message; 
  }
}

