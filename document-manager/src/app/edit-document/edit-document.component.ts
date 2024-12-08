import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { HttpProviderService } from 'src/app/service/http-provider.service';

interface Signer {
  name: string;
  email: string;
}

@Component({
  selector: 'app-edit-document',
  templateUrl: './edit-document.component.html',
  styleUrls: ['./edit-document.component.scss'],
})
export class EditDocumentComponent implements OnInit {
  documentForm: FormGroup;
  documentId: number | null = null;
  isCreating: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private httpProvider: HttpProviderService,
    private cdr: ChangeDetectorRef
  ) {
    this.documentForm = this.fb.group({
      name: ['', Validators.required],
      created_by: ['', Validators.required],
      pdf_url: ['', Validators.required],
      signer_document: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.documentId = +this.route.snapshot.paramMap.get('id')!;
    console.log('Document ID:', this.documentId);
    this.loadDocumentData();
  }

  loadDocumentData() {
    if (this.documentId) {
      this.isCreating = true;
      this.httpProvider.getDocumentById(this.documentId).subscribe(
        (document) => {
          this.documentForm.patchValue({
            name: document.name,
            created_by: document.created_by,
            pdf_url: document.pdf_url,
          });

          const signerArray = this.documentForm.get('signer_document') as FormArray;
          signerArray.clear();
          document.signer_document.forEach((signer: Signer) => {
            signerArray.push(this.fb.group({
              name: [signer.name, Validators.required],
              email: [signer.email, [Validators.required, Validators.email]],
            }));
          });
          this.isCreating = false;
        },
        (error) => {
          console.error('Error loading document:', error);
          this.isCreating = false;
        }
      );
    }
  }

  onSubmit(): void {
    if (this.documentForm.valid && this.documentId) {
      this.isCreating = true;
      this.httpProvider.updateDocument(this.documentId, this.documentForm.value).subscribe(
        () => {
          console.log('Document successfully updated!');
          this.router.navigate(['']);
          this.isCreating = false;
        },
        (error) => {
          console.error('Error updating document:', error);
          this.isCreating = false;
        }
      );
    }
  }

  get signerDocuments() {
    return (this.documentForm.get('signer_document') as FormArray).controls;
  }

  addSigner() {
    const signerArray = this.documentForm.get('signer_document') as FormArray;
    signerArray.push(this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    }));
  }

  removeSigner(index: number) {
    const signerArray = this.documentForm.get('signer_document') as FormArray;
    signerArray.removeAt(index);
  }
}
