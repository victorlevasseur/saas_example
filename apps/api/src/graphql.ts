
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CreateCustomerInput {
    name: string;
    publicName: string;
}

export interface CreateCustomerError {
    message: string;
}

export interface CreateCustomerAlreadyExistsError extends CreateCustomerError {
    __typename?: 'CreateCustomerAlreadyExistsError';
    message: string;
}

export interface CreateCustomerResult {
    __typename?: 'CreateCustomerResult';
    customer?: Nullable<Customer>;
    error?: Nullable<CreateCustomerError>;
}

export interface IMutation {
    __typename?: 'IMutation';
    createCustomer(input: CreateCustomerInput): CreateCustomerResult | Promise<CreateCustomerResult>;
    doNothing(): Nullable<number> | Promise<Nullable<number>>;
}

export interface Customer {
    __typename?: 'Customer';
    id: string;
    name?: Nullable<string>;
    publicName?: Nullable<string>;
}

export interface IQuery {
    __typename?: 'IQuery';
    todos(): Todo[] | Promise<Todo[]>;
}

export interface Todo {
    __typename?: 'Todo';
    id: string;
    text?: Nullable<string>;
}

type Nullable<T> = T | null;
