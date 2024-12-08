import { Component, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../service/http-provider.service';
import { DocumentDetailsModal } from '../document-details-modal/document-details-modal.component';



@Component({
  selector: 'ng-modal-confirm',
  template: `
    <div class="modal-header">
      <h5 class="modal-title" id="modal-title">Delete Confirmation</h5>
      <button type="button" class="btn close" aria-label="Close button" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>Are you sure you want to delete?</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">CANCEL</button>
      <button type="button" ngbAutofocus class="btn btn-success" (click)="modal.close('Ok click')">OK</button>
    </div>
  `,
})
export class NgModalConfirm {
  constructor(public modal: NgbActiveModal) {}
}

const MODALS: { [name: string]: Type<any> } = {
  deleteModal: NgModalConfirm,
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  documentList: any[] = [];
  constructor(
    private router: Router,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private httpProvider: HttpProviderService
  ) {}

  ngOnInit(): void {
    this.getAllDocument();
  }

  getAllDocument() {
    this.httpProvider.getAllDocument().subscribe(
      (response: any) => {
        console.log('Returned Documents:', response);
        if (Array.isArray(response)) {
          this.documentList = response;
        } else {
          console.error('Unexpected response format: ', response);
          this.documentList = [];
        }
      },
      (error: any) => {
        console.error('Error retrieving documents:', error);
        this.documentList = [];
      }
    );
  }

  AddDocument() {
    this.router.navigate(['add']);
  }

  deleteDocumentConfirmation(document: any) {
    this.modalService
      .open(MODALS['deleteModal'], {
        ariaLabelledBy: 'modal-basic-title',
      })
      .result.then(
        (result) => {
          this.deleteDocument(document);
        },
        (reason) => {}
      );
  }

  deleteDocument(document: any) {
    this.httpProvider.deleteDocumentById(document.id).subscribe(
      (data: any) => {
        this.toastr.success('Document successfully deleted!');
        this.getAllDocument();
      },
      (error: any) => {
        console.error('Error deleting document:', error);
      }
    );
  }

  viewDocument(document: any) {
    const modalRef = this.modalService.open(DocumentDetailsModal, { centered: true });
    modalRef.componentInstance.document = document;
  }

  editDocument(document: any) {
    console.log('Update document:', document);
    this.router.navigate(['edit', document.id]);
  }
  
  
}
