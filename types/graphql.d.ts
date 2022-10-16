
declare module '*/auth.gql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const login: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/createRecord.gql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const addMedicalRecord: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/investigations.gql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  

  export default defaultDocument;
}
    