import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IngredientService } from 'src/app/services/ingredient.service';
import {MatSort, Sort} from '@angular/material/sort';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss', '../main.content.style.scss']
})

export class IngredientsComponent implements OnInit, AfterViewInit {

  public ingredientsData !: MatTableDataSource<Ingredient>;
  public displayedColumns = ['name', 'calsperg', 'carbs', 'protein', 'fat']

  public multiplier: number = 100;

  @ViewChild(MatPaginator,{static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort,{static: false}) sort!: MatSort;

  constructor(
    private ingredientService : IngredientService
  ) { 

  }

  ngOnInit(): void {
    this.ingredientService.getIngredients().subscribe(
      {
        next: (result) => {
          this.ingredientsData = new MatTableDataSource<Ingredient>(result);
          this.ingredientsData.paginator = this.paginator;
          this.ingredientsData.sort = this.sort;
          console.log(this.ingredientsData.sort);
        },
        error: (error) => {
          console.error(error);
        }
      }
    );
  }
  
  ngAfterViewInit() {
  }

  public search(input: string) {
    input.trim().toLowerCase();
    this.ingredientsData.filter = input;
  }

  public computeNumber(value : number) {
    return Math.ceil(value * this.multiplier);
  }
 
  public doNothing(x : Sort) {

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