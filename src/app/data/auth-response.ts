
export interface authResponse {
    body: {
        access_token: string,
        refresh_token: string,
        user_id: number,
        username: string
    },
    statusCode: string,
    statusCodeValue: number

}