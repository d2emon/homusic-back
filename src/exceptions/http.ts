class HttpException extends Error {
    code: string;

    status: number;

    message: string;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.message = message;
    }
}

export default HttpException;
