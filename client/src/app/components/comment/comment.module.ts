import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentListComponent } from './components/list/list.component';
import { CommentEditComponent } from './components/edit/edit.component';
import { CommentShowComponent } from './components/show/show.component';
import { CommentLayoutComponent } from './components/layout/layout.component';
import { FlightModule } from '../flight/flight.module';
import { AppRoutingModule } from './comment-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    CommentListComponent,
    CommentEditComponent,
    CommentShowComponent,
    CommentLayoutComponent
  ],
  imports: [
    CommonModule,
    FlightModule,
    AppRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatTooltipModule
  ]
})
export class CommentModule { }
