export type ApiSuccessBase<T = any> = T

export type ApiResponseMessage = { "message": string }

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