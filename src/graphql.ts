
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface NewTodo {
    text: string;
    userId: string;
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

export interface User {
    id: string;
    name: string;
}

export interface IMutation {
    createTodo(input: NewTodo): Todo | Promise<Todo>;
}

type Nullable<T> = T | null;
