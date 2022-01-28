
export interface Ingredient {
    id: string | null;
    name: string;
    calsperg: number;
    carbs: number;
    protein: number;
    fat: number;
    userId: string;
  
  }
  
export interface RecipeModel {
    id: string;
    userId: string;
    name: string;
    numberOfIngredients: number;
    servingSize: number;
    ingredients: RecipeIngredient[]
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
    ingredients: RecipeIngredient[]
  }
  
  export interface RecipeIngredient {
    grams: string;
    ingredientId: string;
 
  }
  
export interface RecipeIngredientModel {
    ingredientId: string;
    name: string;
    grams: string;
  }
  