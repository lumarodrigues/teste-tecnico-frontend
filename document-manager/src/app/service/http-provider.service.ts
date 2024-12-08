import { Injectable } from '@angular/core';
import { WebApiService } from './web-api.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpProviderService {

  private apiUrl: string = environment.apiUrl;
  private httpLink: { 
    getAllDocument: string, 
    deleteDocumentById: string, 
    getDocumentById: string,
    saveDocument: string 
  };

  constructor(private webApiService: WebApiService) {
    this.httpLink = {
      getAllDocument: `${this.apiUrl}api/v1/documents/`,
      deleteDocumentById: `${this.apiUrl}api/v1/documents/`,
      getDocumentById: `${this.apiUrl}api/v1/documents/`,
      saveDocument: `${this.apiUrl}api/v1/documents/`
    };
  }

  getAllDocument() {
    return this.webApiService.get(this.httpLink['getAllDocument']);
  }

  deleteDocumentById(documentId: number) {
    return this.webApiService.delete(`${this.httpLink['deleteDocumentById']}${documentId}/`);
  }

  getDocumentById(documentId: number) {
    return this.webApiService.get(`${this.httpLink['getDocumentById']}${documentId}/`);
  }

  saveDocument(document: any) {
    return this.webApiService.post(this.httpLink['saveDocument'], document);
  }

  updateDocument(id: number, document: any) {
    return this.webApiService.put(`${this.httpLink['getDocumentById']}${id}/`, document);
  }
}
