## Task: Develop and Document a Typed REST API Endpoint with Custom Rate Limiting

**Background**: The project is a TypeScript-based Node.js backend, and the task involves creating a RESTful API that adheres to modern development practices, using specific project dependencies.

**Objective**: Implement a REST API endpoint /api/users/:userId using routing-controllers and @typegoose/typegoose for retrieving user data from a MongoDB database. This should be complemented with Swagger documentation, custom rate limiting, logging, and comprehensive error handling. The endpoint response must be properly typed.

### Requirements:

**API Endpoint with routing**-controllers: Utilize routing-controllers to create a controller for user routes. The /api/users/:userId endpoint should handle GET requests and be well-structured for maintainability.

**Typegoose Model**: Employ @typegoose/typegoose for the User model with fields like name, email, createdAt, etc.

**Data Retrieval and Typed Response**: Implement logic to retrieve a user by userId. Use class-validator for validating the userId parameter. Ensure that the response from the endpoint is typed, providing clear structure to the returned data.

**Swagger Documentation**: Use swagger-ui-express to document the API endpoint. The documentation should detail parameters, request formats, and response types.

**Custom Rate Limiting Middleware**: Develop a custom middleware for rate limiting to control the request rate to the API. This middleware should be configurable and able to handle high traffic gracefully.

**Logging**: Implement logging for requests, responses, and errors. Logs should include essential information such as timestamps, endpoints, status codes, and relevant request/response data.

**Error Handling**: Create an advanced error handling system to manage and respond to different error types effectively, ensuring a consistent API response format.

**Testing**: Conduct comprehensive tests with Jest, encompassing successful requests, validation errors, rate limit violations, and unexpected server errors.

**Project Standards Compliance**: The implementation should adhere to the coding standards and practices of the project.

### Deliverables:

 - Complete source code for the endpoint, including controller, model, middleware, and any other files.
 - Accessible Swagger documentation (e.g., via /api-docs).
 - Jest test suite covering the endpoint's functionality.
 - A detailed report explaining the implementation, with emphasis on the decisions made, especially around the custom rate limiting and response typing.