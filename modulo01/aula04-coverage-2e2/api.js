const http = require("http");
const DEFAULT_USER = {
  username: "maeda",
  password: "123",
};

const routes = {
  "/login:post": async (request, response) => {
    // response é um iterator
    for await (const data of request) {
      const { username, password } = JSON.parse(data);

      if (
        username !== DEFAULT_USER.username ||
        password !== DEFAULT_USER.password
      ) {
        response.writeHead(401);
        response.write("loggin failed");

        return response.end();
      }
    }

    response.write("login has succeeded");
    return response.end();
  },
  "/contact:get": (request, response) => {
    response.write("contact us page");
    return response.end();
  },
  default: (request, response) => {
    response.write("hello world");
    return response.end();
  },
};

const handler = function (request, response) {
  const { url, method } = request;
  const routeKey = `${url}:${method.toLowerCase()}`;
  const chosen = routes[routeKey] || routes.default;
  response.writeHead(200, {
    "Content-Type": "text/html",
  });

  return chosen(request, response);
};

// curl -i localhost:3000
const app = http
  .createServer(handler)
  .listen(3000, () => console.log("Server is online at:", 3000));

module.exports = app;
