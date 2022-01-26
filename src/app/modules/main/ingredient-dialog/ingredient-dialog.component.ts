import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IngredientService } from 'src/app/services/ingredient.service';
import { SnackbarComponent } from 'src/app/snackbar/snackbar.component';

@Component({
  selector: 'app-ingredient-dialog',
  templateUrl: './ingredient-dialog.component.html',
  styleUrls: ['./ingredient-dialog.component.scss']
})
export class IngredientDialogComponent implements OnInit {

  public divideFactor: number = 100;
  public message: string = '';

  public ingredientForm : FormGroup = new FormGroup({
    name: new FormControl(''),
    calsperg: new FormControl(''),
    carbs: new FormControl(''),
    protein: new FormControl(''),
    fat: new FormControl(''),
    
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private ingredientService: IngredientService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<IngredientDialogComponent>

  ) { }

  ngOnInit(): void {
  }

  sendData(ingredientId: string | null = null) {
    
    var id: string | null = null;
    if(ingredientId) {
      id = ingredientId;
    }

    if(this.ingredientForm.value.name == '' 
      || this.ingredientForm.value.calsperg == ''
      || this.ingredientForm.value.protein == ''
      || this.ingredientForm.value.carbs == ''
      || this.ingredientForm.value.fat == ''
    )
    {
      this.message = 'Please fill the form';
    }
    else {
      var ingredient: IngredientData = {
        name: this.ingredientForm.value.name,
        calsperg: this.ingredientForm.value.calsperg,
        carbs: this.ingredientForm.value.carbs,
        protein: this.ingredientForm.value.protein,
        fat: this.ingredientForm.value.fat,
        userId: localStorage.getItem('UserId')!,
        id: id
      }
      
      ingredient.calsperg /= this.divideFactor;
      ingredient.carbs /= this.divideFactor;
      ingredient.protein /= this.divideFactor;
      ingredient.fat /= this.divideFactor;
      

      console.log(ingredient);
      this.message = '';  

      this.ingredientService.addIngredient(ingredient).subscribe({
        next: (result) => {
          
          this.snackBar.openFromComponent(SnackbarComponent, { duration: 4000, panelClass: ['snackbar-success'], data: "Succesfully added a new ingredient!" })
          this.dialogRef.close("success");
        },
        error: (error) => {
          console.error(error);
          this.message = "Failed to add ingredient";
        }
      });
    }
  }
}

export interface DialogData {
  buttonText: string;
  titleText: string;
  formValue: any;
}

export interface IngredientData {
  name: string;
  calsperg: number;
  carbs: number;
  protein: number;
  fat: number;
  userId: string;
  id: string | null;
}