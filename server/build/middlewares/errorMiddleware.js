import { ApiError } from '../exceptions/apiError.js';
export function errorMiddleware(err, req, res, next) {
    if (err instanceof ApiError) {
        const { status, message, errors } = err;
        return res.status(status).json({ message, errors });
    }
    console.log(err);
    return res.status(500).json({ message: 'Unexpected error!' });
}
//# sourceMappingURL=errorMiddleware.js.map