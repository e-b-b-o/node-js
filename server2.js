import { createServer } from "http";

const users = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Doe" },
  { id: 3, name: "Jin Doe" },
];

const PORT = process.env.PORT || 8000;

// logger middleware
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

// json middleware
const jsonMiddleware = (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
};

// users handlers
const getUsersHandler = (req, res) => {
  res.end(JSON.stringify(users));
};

const getUserByIdHandler = (req, res, id) => {
  const user = users.find((user) => user.id === id);

  if (user) {
    return res.end(JSON.stringify(user));
  }

  res.statusCode = 404;
  res.end(JSON.stringify({ message: "User not found" }));
};

// Route handler for Post request

const createUserHandler = (req, res) => {};

// not found handler
const notFoundHandler = (req, res) => {
  res.statusCode = 404;
  res.end(JSON.stringify({ message: "Route not found" }));
};

const server = createServer((req, res) => {
  logger(req, res, () => {
    jsonMiddleware(req, res, () => {
      if (req.url === "/api/users" && req.method === "GET") {
        return getUsersHandler(req, res);
      }

      const match = req.url.match(/^\/api\/users\/([0-9]+)$/);

      if (match && req.method === "GET") {
        const id = parseInt(match[1]);
        return getUserByIdHandler(req, res, id);
      }

      notFoundHandler(req, res);
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
