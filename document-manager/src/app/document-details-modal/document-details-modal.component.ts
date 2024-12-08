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

      <p><strong>PDF URL:</strong>
        <a [href]="document.pdf_url" target="_blank" [title]="document.pdf_url">
          View document in new tab
        </a>
      </p>

      <div *ngIf="document.signer_document && document.signer_document.length > 0; else noSigners">
        <p><strong>Signers:</strong></p>
        <ul>
          <li *ngFor="let signer of document.signer_document">
            {{ signer.name }} ({{ signer.email }})
          </li>
        </ul>
      </div>
      <ng-template #noSigners>
        <p>No signers available.</p>
      </ng-template>
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

      a {
        color: #007bff;
        text-decoration: none;
      }

      a:hover {
        text-decoration: underline;
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
