import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';
import { HomeComponent } from './home/home.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './profile/profile.component';
import { RecipeInfoComponent } from './recipe-info/recipe-info.component';
import { RecipesComponent } from './recipes/recipes.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard],
        
      },
      {
        path: 'ingredients',
        component: IngredientsComponent,
        canActivate: [AuthGuard],

      },
      {
        path: 'recipes',
        component: RecipesComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'profile/:username',
        component: ProfileComponent,
        canActivate: [AuthGuard]
      }

    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
