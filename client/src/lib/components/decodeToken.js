'use client';

const decodeToken = (token) => {
  try {
    // Remove "Bearer " if present
    const rawToken = token.startsWith("Bearer ") ? token.slice(7) : token;

    // JWT format: header.payload.signature → we only need payload
    const base64Url = rawToken.split(".")[1];
    if (!base64Url) throw new Error("Invalid JWT format");

    // Decode and parse
    const base64 = atob(base64Url);
    return JSON.parse(base64);
  } catch (error) {
    console.error("Invalid token:", error.message);
    return null;
  }
};

export default decodeToken; 