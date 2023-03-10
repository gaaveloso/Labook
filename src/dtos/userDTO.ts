import { UserModel, PostModel } from "../types";

export interface GetUsersInput {
    q: unknown,
    token: unknown
}

export type GetUsersOutput = UserModel[]

export interface SignupInput {
    name: unknown,
    email: unknown,
    password: unknown
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

export interface GetPostsInput {
    token: string | undefined
}

export type GetPostsOutput = PostModel[]

export interface CreatePostInput {
    token: string | undefined
    content: unknown
}

export interface EditPostInput {
    idToEdit: string,
    token: string | undefined,
    content: unknown
}

export interface DeletePostInput {
    idToDelete: string,
    token: string | undefined,
}

export interface LikeOrDeslikePostInput {
    idToLikeOrDislike: string,
    token: string | undefined,
    like: unknown
}