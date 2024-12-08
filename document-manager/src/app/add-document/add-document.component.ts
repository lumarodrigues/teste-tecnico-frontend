import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { HttpProviderService } from 'src/app/service/http-provider.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.scss']
})
export class AddDocumentComponent implements OnInit {
  documentForm: FormGroup;
  isCreating: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private httpProvider: HttpProviderService,
    private toastr: ToastrService
  ) {
    this.documentForm = this.fb.group({
      name: ['', Validators.required],
      created_by: ['', Validators.required],
      pdf_url: ['', Validators.required],
      signer_document: this.fb.array([])
    });
  }

  ngOnInit(): void {}

  get signerDocuments(): FormArray {
    return this.documentForm.get('signer_document') as FormArray;
  }

  addSigner(): void {
    this.signerDocuments.push(this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    }));
  }

  removeSigner(index: number): void {
    this.signerDocuments.removeAt(index);
  }

  onSubmit(): void {
    if (this.documentForm.valid) {
      console.log('Form sent:', this.documentForm.value);

      this.isCreating = true;

      this.httpProvider.saveDocument(this.documentForm.value).subscribe(
        response => {
          console.log('Document successfully created!', response);

          this.toastr.success('Document successfully created!');

          this.documentForm.reset();
          this.isCreating = false;
        },
        error => {
          console.error('Error creating document:', error);
          this.toastr.error('Error creating document. Try again.');
          this.isCreating = false;
        }
      );
    } else {
      console.log('Invalid form');
      this.toastr.warning('Fill in all the fields correctly!');
    }
  }
}
