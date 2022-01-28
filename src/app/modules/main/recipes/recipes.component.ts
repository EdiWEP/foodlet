import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/snackbar/snackbar.component';
import { NgIf } from '@angular/common';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { RecipeService } from 'src/app/services/recipe.service';
import { RecipeDialogComponent } from '../recipe-dialog/recipe-dialog.component';
import { animate, state, style, trigger } from '@angular/animations';
import { Recipe, RecipeIngredientModel } from '../interfaces';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss', '../main.content.style.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', display:'none'})),
      state('expanded', style({height: '*'})),
   
    ]),
  ],
})

export class RecipesComponent implements OnInit {

  public recipesData !: MatTableDataSource<Recipe>;
  public ingredientsData !: MatTableDataSource<RecipeIngredientModel>;
  public displayedColumns = ['name', 'calsperg', 'carbs', 'protein', 'fat', 'servingSize', 'numberOfIngredients' ];
  public ingredientDisplayedColumns = ['name', 'grams'];
  public expandedElement: Recipe | null = null;

  @ViewChild(MatPaginator,{static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort,{static: false}) sort!: MatSort;

  constructor(
    private recipeService: RecipeService,
    private snackBar: MatSnackBar,
    private dialog : MatDialog
    ) { }

  ngOnInit(): void {
    this.getRecipes();

  }


  private getRecipes() {
    this.recipeService.getRecipes().subscribe(
      {
        next: (result) => {
          this.recipesData = new MatTableDataSource<Recipe>(result);
          this.ingredientsData = new MatTableDataSource<RecipeIngredientModel>(result.ingredients);
          this.recipesData.paginator = this.paginator;
          this.recipesData.sort = this.sort;
          
        },
        error: (error) => {
          console.error(error);
        }
      }
    );
  }


  public computeNumber(value : number, multiplier : number = 100) {
    return Math.ceil(value * multiplier);
  }

  public search(input: string) {
    input.trim().toLowerCase();
    this.recipesData.filter = input;
  }

  public checkSameId(recipeUserId : string) : boolean {
    return (localStorage.getItem('Role') == 'Admin' || localStorage.getItem('UserId') == recipeUserId);
  }

  public openDeleteDialog(recipeId : string) {
    const dialogRef = 
    this.dialog.open(DeleteDialogComponent, 
      {
        width:"18vw", 
        height:"14vh", 
        data: {
          type: "recipe",
          id: recipeId,
        }
      });

    dialogRef.afterClosed().subscribe(
      (result) => {
        if(result == "yes") {
          this.recipeService.deleteRecipe(recipeId).subscribe({
            next: (result) => {
              this.snackBar.openFromComponent(SnackbarComponent, {
                duration: 4000,
                panelClass: ['snackbar-success'],
                data: "Successfully deleted the recipe"
              });
              this.getRecipes();
            },
            error: (error) => {
              console.error(error);
              this.snackBar.openFromComponent(SnackbarComponent, {
                duration: 4000,
                panelClass: ['snackbar-basic'],
                data: "Couldn't delete the recipe"
              })
            }
          })
        }
        
      }

    );
  }

  public openEditDialog(recipe : Recipe) {
    console.log(recipe);
    const dialogRef =
    this.dialog.open(RecipeDialogComponent, 
      {
        width:"40vw", 
        height:"65vh", 
        data: {
          buttonText: "Save",
          titleText: "Edit Recipe",
          action: "edit",
          formValue: recipe,
        }
      });

      dialogRef.afterClosed().subscribe( result => {
        if(result == "success") {
          //this.recipesData.data.push()
          this.snackBar.openFromComponent(SnackbarComponent, 
            { 
              duration: 4000, 
              panelClass: ['snackbar-success'], 
              data: "Succesfully modified the recipe!" 
           }
          );
          this.getRecipes();

        }
      })
  }

  public openAddDialog() {
    
    const dialogRef =
    this.dialog.open(RecipeDialogComponent, 
      {
        width:"40vw", 
        height:"65vh", 
        data: {
          buttonText: "Save",
          titleText: "New Recipe",
          action: "add",
        }
      });
    
      dialogRef.afterClosed().subscribe( result => {
        if(result == "success") {
          //this.RecipesData.data.push()
          this.snackBar.openFromComponent(SnackbarComponent, 
            { 
              duration: 4000, 
              panelClass: ['snackbar-success'], 
              data: "Succesfully added a new recipe!" 
           }
          );
          
          this.getRecipes();
        }

      });
  }

}

