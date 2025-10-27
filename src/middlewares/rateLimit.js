import rateLimit from 'express-rate-limit';

// Rate limiting middleware to protect the API from abuse.
// Limits each IP to a maximum number of requests per window.
// Adjust the configuration as needed for different environments.
const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
  message: 'Too many requests, please try again later.',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

export default apiRateLimiter;
