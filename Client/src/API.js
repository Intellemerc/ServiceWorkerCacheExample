export const API_GET = "API_GET";

function buildUrl(resource) {
  const baseUrl = "";

  return `${baseUrl}${resource}`;
}

export default {
  GET(resource, data) {
    return window
      .fetch(buildUrl(resource), {
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
