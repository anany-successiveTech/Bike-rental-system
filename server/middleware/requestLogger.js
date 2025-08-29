
// Middleware to log incoming requests

const requestLogger = (err, req, _, next) => {
  const { url, method } = req;
  console.log(`[${new Date().toLocaleTimeString()}] ${method} ${url}`);
  next();
};

export default requestLogger;
