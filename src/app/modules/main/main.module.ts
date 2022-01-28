import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from '../material/material.module';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { RecipesComponent } from './recipes/recipes.component';
import { MainComponent } from './main/main.component';
import { IngredientDialogComponent } from './ingredient-dialog/ingredient-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { ProfileComponent } from './profile/profile.component';
import { RecipeDialogComponent } from './recipe-dialog/recipe-dialog.component';
import { RecipeingredientComponent } from './recipeingredient/recipeingredient.component';
import { RecipeIngredientDialogComponent } from './recipe-ingredient-dialog/recipe-ingredient-dialog.component';
import { Recipe, RecipeModel, RecipeIngredient, RecipeIngredientModel, Ingredient } from './interfaces';

@NgModule({
  declarations: [
    HomeComponent,
    IngredientsComponent,
    RecipesComponent,
    MainComponent,
    IngredientDialogComponent,
    DeleteDialogComponent,
    ProfileComponent,
    RecipeDialogComponent,
    RecipeingredientComponent,
    RecipeIngredientDialogComponent,

  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class MainModule { }
