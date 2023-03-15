
export {}

declare global {
    namespace Express {
        // interface Request {
        //     auth: User;
        // }

        interface Response {
            Success(message: string, data?: any, responseCode?: number): void;
            Error(message: string, data?: any, responseCode?: number): void;
        }
    }
}
