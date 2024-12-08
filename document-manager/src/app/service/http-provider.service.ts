import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from './web-api.service';

const apiUrl = "http://127.0.0.1:8001/";

const httpLink = {
  getAllDocument: apiUrl + "api/v1/documents/",
  deleteDocumentById: apiUrl + "api/v1/documents/",
  getDocumentDetailById: apiUrl + "api/v1/documents/",
  saveDocument: apiUrl + "api/v1/documents/",
};

@Injectable({
  providedIn: 'root'
})
export class HttpProviderService {

  constructor(private webApiService: WebApiService) { }

  public getAllDocument(): Observable<any> {
    return this.webApiService.get(httpLink.getAllDocument);
  }

  public deleteDocumentById(documentId: string): Observable<any> {
    return this.webApiService.delete(httpLink.deleteDocumentById + documentId + '/');
  }

  public getDocumentDetailById(documentId: string): Observable<any> {
    return this.webApiService.get(httpLink.getDocumentDetailById + documentId + '/');
  }

  public saveDocument(document: any): Observable<any> {
    console.log('Sending document:', document);
    return this.webApiService.post(httpLink.saveDocument, document);
  }

  public getDocumentById(documentId: number): Observable<any> {
    return this.webApiService.get(httpLink.getDocumentDetailById + documentId + '/');
  }

  public updateDocument(id: number, document: any): Observable<any> {
    return this.webApiService.put(httpLink.getDocumentDetailById + id + '/', document);
  }
}

