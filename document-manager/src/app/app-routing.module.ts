import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewDocumentComponent } from './view-document/view-document.component';
import { AddDocumentComponent } from './add-document/add-document.component';
import { EditDocumentComponent } from './edit-document/edit-document.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'view/:documentId', component: ViewDocumentComponent },
  { path: 'add', component: AddDocumentComponent },
  { path: 'edit/:documentId', component: EditDocumentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
