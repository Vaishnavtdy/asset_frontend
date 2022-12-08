export function getStrapiMedia(url) {
  // Check if URL is a local path
  if (typeof url==='string' && url.startsWith("/")) {
    // Prepend Strapi address
    return `${
      process.env.GRIDSOME_STRAPI_URL || "http://localhost:1337"
    }${url}`;
  }
  // Otherwise return full URL
  return url;
}
