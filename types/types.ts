export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Investigation = {
  __typename?: 'Investigation';
  data?: Maybe<MedicalRecordInvestigation>;
  id: Scalars['ID'];
  title: Scalars['String'];
  type: InvestigationType;
};

export type InvestigationType = {
  __typename?: 'InvestigationType';
  id: Scalars['ID'];
  investigations: Array<Investigation>;
  title: Scalars['String'];
};

export type MedicalRecord = {
  __typename?: 'MedicalRecord';
  created_at: Scalars['DateTime'];
  ctscan: Scalars['String'];
  id: Scalars['ID'];
  investigations: Array<Investigation>;
  mri: Scalars['String'];
  patient: User;
};

export type MedicalRecordInvestigation = {
  __typename?: 'MedicalRecordInvestigation';
  id: Scalars['ID'];
  result: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  add_medical_record?: Maybe<MedicalRecord>;
  login?: Maybe<Scalars['String']>;
};


export type MutationAdd_Medical_RecordArgs = {
  ctscan: Scalars['String'];
  developer: Scalars['String'];
  investigations: Array<Scalars['ID']>;
  mri: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

/** Allows ordering a list of records. */
export type OrderByClause = {
  /** The column that is used for ordering. */
  column: Scalars['String'];
  /** The direction that is used for ordering. */
  order: SortOrder;
};

/** Aggregate functions when ordering by a relation without specifying a column. */
export enum OrderByRelationAggregateFunction {
  /** Amount of items. */
  Count = 'COUNT'
}

/** Aggregate functions when ordering by a relation that may specify a column. */
export enum OrderByRelationWithColumnAggregateFunction {
  /** Average. */
  Avg = 'AVG',
  /** Amount of items. */
  Count = 'COUNT',
  /** Maximum. */
  Max = 'MAX',
  /** Minimum. */
  Min = 'MIN',
  /** Sum. */
  Sum = 'SUM'
}

/** Information about pagination using a Relay style cursor connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** Number of nodes in the current page. */
  count: Scalars['Int'];
  /** Index of the current page. */
  currentPage: Scalars['Int'];
  /** The cursor to continue paginating forwards. */
  endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** Index of the last available page. */
  lastPage: Scalars['Int'];
  /** The cursor to continue paginating backwards. */
  startCursor?: Maybe<Scalars['String']>;
  /** Total number of nodes in the paginated connection. */
  total: Scalars['Int'];
};

/** Information about pagination using a fully featured paginator. */
export type PaginatorInfo = {
  __typename?: 'PaginatorInfo';
  /** Number of items in the current page. */
  count: Scalars['Int'];
  /** Index of the current page. */
  currentPage: Scalars['Int'];
  /** Index of the first item in the current page. */
  firstItem?: Maybe<Scalars['Int']>;
  /** Are there more pages after this one? */
  hasMorePages: Scalars['Boolean'];
  /** Index of the last item in the current page. */
  lastItem?: Maybe<Scalars['Int']>;
  /** Index of the last available page. */
  lastPage: Scalars['Int'];
  /** Number of items per page. */
  perPage: Scalars['Int'];
  /** Number of total available items. */
  total: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  investigation_types: Array<InvestigationType>;
  investigations: Array<Investigation>;
  me?: Maybe<User>;
};

/** Information about pagination using a simple paginator. */
export type SimplePaginatorInfo = {
  __typename?: 'SimplePaginatorInfo';
  /** Number of items in the current page. */
  count: Scalars['Int'];
  /** Index of the current page. */
  currentPage: Scalars['Int'];
  /** Index of the first item in the current page. */
  firstItem?: Maybe<Scalars['Int']>;
  /** Are there more pages after this one? */
  hasMorePages: Scalars['Boolean'];
  /** Index of the last item in the current page. */
  lastItem?: Maybe<Scalars['Int']>;
  /** Number of items per page. */
  perPage: Scalars['Int'];
};

/** Directions for ordering a list of records. */
export enum SortOrder {
  /** Sort records in ascending order. */
  Asc = 'ASC',
  /** Sort records in descending order. */
  Desc = 'DESC'
}

/** Specify if you want to include or exclude trashed results from a query. */
export enum Trashed {
  /** Only return trashed results. */
  Only = 'ONLY',
  /** Return both trashed and non-trashed results. */
  With = 'WITH',
  /** Only return non-trashed results. */
  Without = 'WITHOUT'
}

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  records: Array<MedicalRecord>;
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: string | null };

export type Add_Medical_RecordMutationVariables = Exact<{
  investigations: Array<Scalars['ID']> | Scalars['ID'];
  ctscan: Scalars['String'];
  mri: Scalars['String'];
  developer: Scalars['String'];
}>;


export type Add_Medical_RecordMutation = { __typename?: 'Mutation', add_medical_record?: { __typename?: 'MedicalRecord', id: string, ctscan: string, mri: string, created_at: any, patient: { __typename?: 'User', id: string, name: string, email: string }, investigations: Array<{ __typename?: 'Investigation', id: string, title: string, type: { __typename?: 'InvestigationType', id: string, title: string } }> } | null };

export type Unnamed_1_QueryVariables = Exact<{ [key: string]: never; }>;


export type Unnamed_1_Query = { __typename?: 'Query', investigations: Array<{ __typename?: 'Investigation', id: string, title: string, type: { __typename?: 'InvestigationType', id: string, title: string } }> };
