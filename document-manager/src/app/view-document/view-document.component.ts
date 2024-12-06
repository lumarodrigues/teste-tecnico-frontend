import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpProviderService } from 'src/app/service/http-provider.service';

interface Signer {
  name: string;
  email: string;
}

@Component({
  selector: 'app-document-details',
  templateUrl: './view-document.component.html',
  styleUrls: ['./view-document.component.scss'],
})
export class ViewDocumentComponent implements OnInit {
  document: any;
  signers: Signer[] = [];
  pdfUrl: string = '';

  constructor(
    private route: ActivatedRoute,
    private httpProvider: HttpProviderService
  ) {}

  ngOnInit(): void {
    const documentId = +this.route.snapshot.paramMap.get('id')!;
    this.loadDocumentData(documentId);
  }

  loadDocumentData(documentId: number) {
    this.httpProvider.getDocumentById(documentId).subscribe(
      (document) => {
        this.document = document;
        this.signers = document.signer_document;
        this.pdfUrl = document.pdfUrl;
      },
      (error) => {
        console.error('Erro ao carregar documento:', error);
      }
    );
  }
}
