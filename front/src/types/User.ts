export enum UserCookieType {
    SESSION = "session",
}

export type User = {
    id: number,
    email: string,
}

export type UserRegister = {
    email: string,
    password: string,
}
