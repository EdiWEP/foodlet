import { identifierName } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IngredientService } from 'src/app/services/ingredient.service';
import { RecipeService } from 'src/app/services/recipe.service';
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
  public recipeIngredients: IngredientEntry[] = [] as IngredientEntry[];;

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
          
          var newIng : IngredientEntry = result;
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
      document.getElementById("message")!.innerText = "Please fill the form";
    }
    else {
      if(this.recipeIngredients.length < 2) {
        document.getElementById("message")!.innerText = "Please add at least two ingredients";
      }
    }
  }

  public removeIngredient(name: string) {
    this.recipeIngredients = this.recipeIngredients.filter((value) => {return value.name != name});

  }
}


export interface IngredientEntry {
  id: string;
  name: string;
  grams: string;
}

export interface Ingredient {
  id: string;
  name: string;
  calsperg: number;
  carbs: number;
  protein: number;
  fat: number;
  userId: string;
}


export interface Recipe {
  id: string;
  name: string;
  calsperg: number;
  carbs: number;
  protein: number;
  fat: number;
  userId: string;
  numberOfIngredients: number;
  servingSize: number;
  ingredients: [RecipeIngredient]
}

export interface RecipeIngredient {
  id: string;
  grams: string;
}