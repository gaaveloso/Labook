import { UserModel } from "../types";

export interface GetUsersInput {
    q: unknown,
    token: unknown
}

export type GetUsersOutput = UserModel[]

export interface SignupInput {
    name: string,
    email: string,
    password: string
}

export interface SignupOutput {
    message: string,
    token: string
}

export interface LoginInput {
    email: unknown,
    password: unknown
}

export interface LoginOutput {
    message: string,
    token: string
}