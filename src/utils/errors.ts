// Custom error class for not found error
export class NotFoundError extends Error {
    constructor(message: string = 'Resource not found') {
        super(message);
        this.name = 'NotFoundError';
    }
}

// Custom error class for validation error
export class ValidationError extends Error {
    details: any[]; // Define the details property

    constructor(errors: any[]) {
        super('Validation error');
        this.name = 'ValidationError';
        this.details = errors;
    }
}
  