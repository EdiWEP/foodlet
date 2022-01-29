import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IngredientService } from 'src/app/services/ingredient.service';
import {MatSort, Sort} from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { IngredientDialogComponent } from '../ingredient-dialog/ingredient-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/snackbar/snackbar.component';
import { NgIf } from '@angular/common';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { Ingredient } from '../interfaces';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss', '../main.content.style.scss']
})

export class IngredientsComponent implements OnInit {

 
  public ingredientsData !: MatTableDataSource<Ingredient>;
  public displayedColumns = ['name', 'calsperg', 'carbs', 'protein', 'fat']
  private lastFilter : string = '';

  @ViewChild(MatPaginator,{static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort,{static: false}) sort!: MatSort;

  constructor(
    private ingredientService : IngredientService,
    private snackBar: MatSnackBar,
    private dialog : MatDialog
  ) { 

  }

  ngOnInit(): void {
    
    this.getIngredients();
    
  }
  
  

  public openDeleteDialog(ingredientId : string) {
    const dialogRef = 
    this.dialog.open(DeleteDialogComponent, 
      {
        width:"18vw", 
        height:"14vh", 
        data: {
          type: "ingredient",
          id: ingredientId,
        }
      });

    dialogRef.afterClosed().subscribe(
      (result) => {
      
        if(result == "yes") {
          this.ingredientService.deleteIngredient(ingredientId).subscribe({
            next: (result) => {
              this.snackBar.openFromComponent(SnackbarComponent, {
                duration: 4000,
                panelClass: ['snackbar-success'],
                data: "Successfully deleted the ingredient"
              });
              this.removeIngredient(ingredientId);
            },
            error: (error) => {
              console.error(error);
              this.snackBar.openFromComponent(SnackbarComponent, {
                duration: 4000,
                panelClass: ['snackbar-basic'],
                data: "Couldn't delete the ingredient"
              })
            }
          })
        }
        
      }

    );
  }

  public openEditDialog(ingredient : Ingredient) {
    const dialogRef =
    this.dialog.open(IngredientDialogComponent, 
      {
        width:"30vw", 
        height:"65vh", 
        data: {
          buttonText: "Save",
          titleText: "Edit Ingredient",
          action: "edit",
          formValue: this.multiplyValues(ingredient),
        }
      });

    dialogRef.afterClosed().subscribe( result => {
      if(result) {
        //this.ingredientsData.data.push()
        this.snackBar.openFromComponent(SnackbarComponent, 
          { 
            duration: 4000, 
            panelClass: ['snackbar-success'], 
            data: "Succesfully modified the ingredient!" 
          }
        );
        this.updateIngredient(result, ingredient);

      }
    });
  }

  public openAddDialog() {
    const dialogRef =
    this.dialog.open(IngredientDialogComponent, 
      {
        width:"30vw", 
        height:"65vh", 
        data: {
          buttonText: "Add",
          titleText: "New Ingredient",
          action: "add",
        }
      });
    
    dialogRef.afterClosed().subscribe( result => {
      if(result) {
        //this.ingredientsData.data.push()
        this.snackBar.openFromComponent(SnackbarComponent, 
          { 
            duration: 4000, 
            panelClass: ['snackbar-success'], 
            data: "Succesfully added a new ingredient!" 
          }
        );
        
        this.addIngredient(result);
      }

    });
  }

  private getIngredients() {
    this.ingredientService.getIngredients().subscribe(
      {
        next: (result) => {
          this.ingredientsData = new MatTableDataSource<Ingredient>(result);
          this.ingredientsData.paginator = this.paginator;
          this.ingredientsData.sort = this.sort;
        },
        error: (error) => {
          console.error(error);
        }
      }
    );
  }
  
  public addIngredient(ingredient : Ingredient) {
    this.ingredientsData.data.push(ingredient);
    this.refreshTableData();
  }
  
  public removeIngredient(id : string) {
    this.ingredientsData.data = this.ingredientsData.data.filter((ingredient) => ingredient.id != id);
    this.refreshTableData();
  }
  
  public updateIngredient(ingredient : Ingredient, oldIngredient : Ingredient) {
    var index = this.ingredientsData.data.indexOf(oldIngredient);
    this.ingredientsData.data.splice(index, 1, ingredient);
    this.refreshTableData();
  }
  
  public checkSameId(ingredientUserId : string) : boolean {
    return (localStorage.getItem('Role') == 'Admin' || localStorage.getItem('UserId') == ingredientUserId);
  }
  
  
  public search(input: string) {
    input.trim().toLowerCase();
    this.lastFilter = input;
    this.ingredientsData.filter = input;
  }

  public computeNumber(value : number, multiplier : number = 100) {
    return Math.ceil(value * multiplier);
  }

  public multiplyValues(ingredient : Ingredient) : Ingredient {
    
    var modifiedIngredient = {
      id: ingredient.id,
      userId: ingredient.userId,
      name: ingredient.name,
      calsperg: Math.ceil(ingredient.calsperg * 100),
      carbs: Math.ceil(ingredient.carbs * 100),
      protein: Math.ceil(ingredient.protein * 100),
      fat: Math.ceil(ingredient.fat * 100),
    
    } 

    return modifiedIngredient;
  }

  private refreshTableData() {
    this.ingredientsData.sort = this.sort;
    this.ingredientsData.paginator = this.paginator;
    this.ingredientsData.filter = this.lastFilter;
  }
}


