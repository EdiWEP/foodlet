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
              this.getIngredients();
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
        if(result == "success") {
          //this.ingredientsData.data.push()
          this.snackBar.openFromComponent(SnackbarComponent, 
            { 
              duration: 4000, 
              panelClass: ['snackbar-success'], 
              data: "Succesfully modified the ingredient!" 
           }
          );
          this.getIngredients();

        }
      })
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
        if(result == "success") {
          //this.ingredientsData.data.push()
          this.snackBar.openFromComponent(SnackbarComponent, 
            { 
              duration: 4000, 
              panelClass: ['snackbar-success'], 
              data: "Succesfully added a new ingredient!" 
           }
          );
          
          this.getIngredients();
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
  
  public search(input: string) {
    input.trim().toLowerCase();
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
      calsperg: ingredient.calsperg * 100,
      carbs: ingredient.carbs * 100,
      protein: ingredient.protein * 100,
      fat: ingredient.fat * 100,
    
    } 

    return modifiedIngredient;
  }

  public checkSameId(ingredientUserId : string) : boolean {
    return (localStorage.getItem('Role') == 'Admin' || localStorage.getItem('UserId') == ingredientUserId);
  }

  
  
}


