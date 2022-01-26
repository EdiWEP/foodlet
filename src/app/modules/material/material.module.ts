import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input'; 
import {MatCardModule} from '@angular/material/card'; 
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs'; 
import {MatSidenavModule} from '@angular/material/sidenav'; 
import {MatDividerModule} from '@angular/material/divider'; 
import {MatTableModule} from '@angular/material/table'; 
import { MatSnackBarModule} from '@angular/material/snack-bar'; 
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon'; 
import { MatSortModule } from '@angular/material/sort';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatTabsModule,    
    MatSidenavModule,
    MatDividerModule,
    MatTableModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatIconModule,
    MatSortModule,

  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatTabsModule,
    MatDividerModule,
    MatSidenavModule,
    MatTableModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatIconModule,
    MatSortModule,
        
  ]
})
export class MaterialModule { }
