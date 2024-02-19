export enum UserCookieType {
    SESSION = "session",
}

export type User = {
    id: number,
    email: string,
    firstname: string,
    lastname: string,
}

export type UserRegister = {
    email: string,
    firstname: string,
    lastname: string,
    password: string,
    confirmPassword: string,
}
