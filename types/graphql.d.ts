
declare module '*/auth.gql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const login: DocumentNode;

  export default defaultDocument;
}
    