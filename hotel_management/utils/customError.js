class CustomError extends Error {
    constructor(message, statuscode) {
        super(message);
        this.status = statuscode;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, message);
        }
    }
};

new CustomError("Error in connecting db", 500)