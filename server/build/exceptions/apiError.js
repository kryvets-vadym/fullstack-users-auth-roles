export class ApiError extends Error {
    constructor(status, message, errors = {}) {
        super(message);
        this.status = status;
        this.errors = errors;
    }
    static UnauthorizedError() {
        return new ApiError(401, 'User is not authorised!');
    }
    static UserRoleError() {
        return new ApiError(403, 'Inappropriate user role!');
    }
    static BadRequest(message, errors) {
        return new ApiError(400, message, errors);
    }
    static NotFound() {
        return new ApiError(404, 'Not Found!');
    }
}
//# sourceMappingURL=apiError.js.map