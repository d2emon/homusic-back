import HttpException from "./http";

class NotFoundException extends HttpException {
    constructor(message: string = 'Not Found') {
        super(404, message);
    }
}

export default NotFoundException;
