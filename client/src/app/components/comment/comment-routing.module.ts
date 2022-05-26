import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommentEditComponent } from './components/edit/edit.component';
import { CommentLayoutComponent } from './components/layout/layout.component';
import { CommentListComponent } from './components/list/list.component';
import { CommentShowComponent } from './components/show/show.component';

const routes: Routes = [{
  path: '', component: CommentLayoutComponent, children: [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'new', component: CommentEditComponent },
    { path: 'list', component: CommentListComponent },
    { path: 'list/:id', component: CommentListComponent },
    { path: 'edit/:id', component: CommentEditComponent },
    { path: 'show/:id', component: CommentShowComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
