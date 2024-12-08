export interface SignerDocument {
    name: string;
    email: string;
  }
  
  export interface Document {
    name: string;
    created_by: string;
    pdf_url: string;
    signer_document: SignerDocument[];
  }
  