
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

export interface NewTodo {
    text: string;
    userId: string;
}

export interface CreateCustomerError {
    message: string;
}

export interface IQuery {
    todos(): Todo[] | Promise<Todo[]>;
}

export interface Todo {
    id: string;
    text: string;
    done: boolean;
    user: User;
}

export interface CreateCustomerAlreadyExistsError extends CreateCustomerError {
    message: string;
}

export interface CreateCustomerResult {
    customer?: Nullable<Customer>;
    error?: Nullable<CreateCustomerError>;
}

export interface IMutation {
    createCustomer(input: CreateCustomerInput): CreateCustomerResult | Promise<CreateCustomerResult>;
    doNothing(): Nullable<number> | Promise<Nullable<number>>;
    createTodo(input: NewTodo): Todo | Promise<Todo>;
}

export interface Customer {
    id: string;
    name?: Nullable<string>;
    publicName?: Nullable<string>;
}

export interface User {
    id: string;
    name: string;
}

type Nullable<T> = T | null;
