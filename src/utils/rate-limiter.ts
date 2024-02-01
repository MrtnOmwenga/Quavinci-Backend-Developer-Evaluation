import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minutes
    max: 10, // limit each IP to 100 requests per windowMs
});

export default limiter;