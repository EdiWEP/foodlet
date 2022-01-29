import { BuiltinType } from '@angular/compiler';
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { IngredientService } from 'src/app/services/ingredient.service';
import { SnackbarComponent } from 'src/app/snackbar/snackbar.component';
import { Ingredient } from '../interfaces';

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
    public dialogRef: MatDialogRef<IngredientDialogComponent>

  ) { 
    
    if (this.data.formValue ) {
      this.ingredientForm.patchValue(this.data.formValue);
    }
   
  }

  ngOnInit(): void {
  }

  sendData() {
    
    var id: string | null = null;
    

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
      var ingredient: Ingredient = {
        name: this.ingredientForm.value.name,
        calsperg: this.ingredientForm.value.calsperg,
        carbs: this.ingredientForm.value.carbs,
        protein: this.ingredientForm.value.protein,
        fat: this.ingredientForm.value.fat,
        userId: localStorage.getItem('UserId')!,
        id: null,
      }
      
      
      if(this.data.formValue) {
        ingredient.id = this.data.formValue.id;
      }
      ingredient.calsperg /= this.divideFactor;
      ingredient.carbs /= this.divideFactor;
      ingredient.protein /= this.divideFactor;
      ingredient.fat /= this.divideFactor;
      
      this.message = '';  

      if(this.data.action == "add") {
        this.ingredientService.addIngredient(ingredient).subscribe({
          next: (result) => {
            
            ingredient.id = result;
            this.dialogRef.close(ingredient);
          },
          error: (error) => {
            console.error(error);
            this.message = "Failed to "+ this.data.action +" ingredient";
          }
        });
      }
      else {
        this.ingredientService.updateIngredient(ingredient).subscribe({
          next: (result) => {
            
            this.dialogRef.close(ingredient);
          },
          error: (error) => {
            console.error(error);
            this.message = "Failed to "+ this.data.action +" ingredient";
          }
        });
      }
      
    }
  }
}

export interface DialogData {
  buttonText: string;
  titleText: string;
  formValue: any;
  action: string;
}

