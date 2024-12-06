export interface SignerDocument {
    name: string;
    email: string;
  }
  
  export interface Document {
    name: string;
    created_by: string;
    external_id: string;
    signer_document: SignerDocument[];
  }
  