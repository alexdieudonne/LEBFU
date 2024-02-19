export interface ApiSuccessBase<T = any> {
    "response": {
        "status": number,
        "message": string,
        "url": string
    },
    "data": T
}

export type ApiErrorResponse = {
    data: ApiErrorData,
    status: number
}

export type ApiErrorData = {
    "errors": Array<ApiErrorViolations>
}

export type ApiErrorViolations = {
    "rule": string,
    "field": string,
    "message": string
}