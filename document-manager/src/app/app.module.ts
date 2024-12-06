import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ViewDocumentComponent } from './view-document/view-document.component';
import { AddDocumentComponent } from './add-document/add-document.component';
import { EditDocumentComponent } from './edit-document/edit-document.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { DocumentDetailsModal } from './document-details-modal/document-details-modal.component';
import { RouterModule } from '@angular/router';
import { PdfViewerModule } from 'ng2-pdf-viewer';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ViewDocumentComponent,
    AddDocumentComponent,
    EditDocumentComponent,
    DocumentDetailsModal,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule,
    PdfViewerModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DocumentDetailsModal],
})
export class AppModule { }
