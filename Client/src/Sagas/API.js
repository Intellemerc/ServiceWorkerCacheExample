export const API_GET = "API_GET";

function buildUrl(resource, bustCache = false) {
  const baseUrl = "";

  return (
    `${baseUrl}${resource}` + (bustCache ? "?bc=" + new Date().getTime() : "")
  );
}

export default {
  GET(resource, data, options) {
    options = options || {};
    return window
      .fetch(buildUrl(resource, options.bustCache), {
        method: "get"
      })
      .then(resp => {
        return resp.json();
      })
      .catch(error => {
        console.error("Make sure you start the server: ", error);
      });
  }
};
