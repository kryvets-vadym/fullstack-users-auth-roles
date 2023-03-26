export class ApiError extends Error {
  status;
  errors;

  constructor(status: number, message: string, errors = {}) {
    super(message);

    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError() {
    return new ApiError(401, 'User is not authorised!')
  }

  static UserRoleError() {
    return new ApiError(403, 'Inappropriate user role!')
  }


  static BadRequest(message: string, errors?: Record<string, string>) {
    return new ApiError(400, message, errors)
  }

  static NotFound() {
    return new ApiError(404, 'Not Found!');
  }
}
