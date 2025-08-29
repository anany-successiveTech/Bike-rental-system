// Common HTTP status messages to use across controllers and the global error handler
const errorMessages = {
  // 200 Series – Success
  200: "OK - Request succeeded",
  201: "Created - Resource created successfully",
  202: "Accepted - Request accepted for processing",
  204: "No Content - Success with no response body",

  // 300 Series – Redirection
  301: "Moved Permanently - Resource moved to a new URL",
  302: "Found - Resource temporarily moved",
  304: "Not Modified - Cached version is still valid",

  // 400 Series – Client Errors
  400: "Bad Request - Invalid request syntax or parameters",
  401: "Unauthorized - Authentication required or failed",
  402: "Payment Required - Payment is required to access the resource",
  403: "Forbidden - Access to the resource is denied",
  404: "Not Found - Route or resource not found",
  405: "Method Not Allowed - HTTP method not supported for this route",
  406: "Not Acceptable - Requested format is not available",
  408: "Request Timeout - The server timed out waiting for the request",
  409: "Conflict - Resource conflict (e.g., duplicate entry)",
  410: "Gone - Resource is no longer available",
  411: "Length Required - Content-Length header is missing",
  412: "Precondition Failed - One or more conditions given in the request header fields evaluated to false",
  413: "Payload Too Large - Request entity is larger than limits defined by server",
  415: "Unsupported Media Type - Payload format is not supported",
  416: "Range Not Satisfiable - Requested range not available",
  417: "Expectation Failed - Server cannot meet the requirements of the Expect request-header field",
  422: "Unprocessable Entity - Request is well-formed but contains semantic errors",
  429: "Too Many Requests - Rate limit exceeded",
  431: "Request Header Fields Too Large - Header fields too large",

  // 426 Upgrade and 451 Legal
  426: "Upgrade Required - Client should switch to a different protocol",
  451: "Unavailable For Legal Reasons - Resource blocked for legal reasons",

  // 500 Series – Server Errors
  500: "Internal Server Error - Something went wrong on the server",
  501: "Not Implemented - Server does not support the functionality required",
  502: "Bad Gateway - Invalid response from upstream server",
  503: "Service Unavailable - Server is overloaded or down",
  504: "Gateway Timeout - Upstream server failed to respond in time",
  505: "HTTP Version Not Supported - Server does not support the HTTP protocol version used",
  507: "Insufficient Storage - Server is unable to store the representation needed to complete the request",
};

export default errorMessages;
