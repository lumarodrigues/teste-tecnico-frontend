import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-document-details-modal',
  template: `
    <div class="modal-header">
      <h5 class="modal-title">Document Details</h5>
      <button type="button" class="btn close" aria-label="Close" (click)="modal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p><strong>Name:</strong> {{ document.name }}</p>
      <p><strong>Created By:</strong> {{ document.created_by }}</p>
      <p><strong>External ID:</strong> {{ document.external_id }}</p>

      <!-- Exibe o PDF diretamente no modal -->
      <div *ngIf="document.pdfUrl">
        <embed [src]="getSanitizedUrl(document.pdfUrl)" type="application/pdf" width="100%" height="600px" />
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" (click)="modal.dismiss('cancel click')">Close</button>
    </div>
  `,
  styles: [
    `
      .modal-body {
        padding: 20px;
      }

      embed {
        border: none;
      }
    `,
  ],
})
export class DocumentDetailsModal {
  @Input() document: any;

  constructor(public modal: NgbActiveModal, private sanitizer: DomSanitizer) {}

  getSanitizedUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
