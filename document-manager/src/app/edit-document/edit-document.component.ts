import { Component, OnInit } from '@angular/core';
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

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private httpProvider: HttpProviderService
  ) {
    this.documentForm = this.fb.group({
      name: ['', Validators.required],
      created_by: ['', Validators.required],
      external_id: ['', Validators.required],
      signer_document: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.documentId = +this.route.snapshot.paramMap.get('id')!;
    this.loadDocumentData();
  }

  loadDocumentData() {
    if (this.documentId) {
      this.httpProvider.getDocumentById(this.documentId).subscribe(
        (document) => {
          this.documentForm.patchValue({
            name: document.name,
            created_by: document.created_by,
            external_id: document.external_id,
          });

          const signerArray = this.documentForm.get('signer_document') as FormArray;
          document.signer_document.forEach((signer: Signer) => {
            signerArray.push(this.fb.group({
              name: [signer.name, Validators.required],
              email: [signer.email, [Validators.required, Validators.email]],
            }));
          });
        },
        (error) => {
          console.error('Error loading document:', error);
        }
      );
    }
  }

  onSubmit(): void {
    if (this.documentForm.valid && this.documentId) {
      this.httpProvider.updateDocument(this.documentId, this.documentForm.value).subscribe(
        () => {
          console.log('Document successfuly updated!');
          this.router.navigate(['/Home']);
        },
        (error) => {
          console.error('Error updating document:', error);
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
