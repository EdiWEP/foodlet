import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IngredientService } from 'src/app/services/ingredient.service';
import {MatSort, Sort} from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { IngredientDialogComponent } from '../ingredient-dialog/ingredient-dialog.component';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss', '../main.content.style.scss']
})

export class IngredientsComponent implements OnInit, AfterViewInit {

  public ingredientsData !: MatTableDataSource<Ingredient>;
  public displayedColumns = ['name', 'calsperg', 'carbs', 'protein', 'fat']


  @ViewChild(MatPaginator,{static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort,{static: false}) sort!: MatSort;

  constructor(
    private ingredientService : IngredientService,
    private dialog : MatDialog
  ) { 

  }

  ngOnInit(): void {
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

    this.openAddDialog();
    
  }
  
  ngAfterViewInit() {
  }

  public openAddDialog() {
    const dialogRef =
    this.dialog.open(IngredientDialogComponent, 
      {
        width:"30vw", 
        height:"65vh", 
        data: {
          buttonText: "Add",
          titleText: "New Ingredient"
        }
      });
    
      dialogRef.afterClosed().subscribe( result => {
        if(result == "success") {
          //this.ingredientsData.data.push()
        }
      })
  }
  
  public search(input: string) {
    input.trim().toLowerCase();
    this.ingredientsData.filter = input;
  }

  public computeNumber(value : number, multiplier : number = 100) {
    return Math.ceil(value * multiplier);
  }
 
  
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