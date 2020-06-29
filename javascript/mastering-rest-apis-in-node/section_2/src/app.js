const http = require("http");
const url = require("url");

const data = require("./data");

const endpoint = "/api/employees";

const listAllEmployees = (req, res) => {
  res.statusCode = 200;
  res.end(JSON.stringify(data));
};

const addEmployee = (req, res) => {
  let body = "";

  req.on("data", (chunk) => (body += chunk.toString()));
  req.on("end", () => {
    data.push(JSON.parse(body));
    res.statusCode = 201;
    return res.end(`${JSON.parse(body).name} added`);
  });

  req.on("error", (e) => {
    res.statusCode = 400;
    return res.end(e);
  });
};

const defaultRoute = (req, res) => {
  res.statusCode = 404;
  res.end(`Please use the '${endpoint}' endpoint`);
};

const server = http.createServer((req, res) => {
  const urlParts = url.parse(req.url);
  console.log(urlParts);
  if (urlParts.pathname === endpoint) {
    switch (req.method) {
      case "GET":
        listAllEmployees(req, res);
        break;
      case "POST":
        addEmployee(req, res);
        break;
      default:
        defaultRoute(req, res);
        break;
    }
  } else {
    defaultRoute(req, res);
  }
});

server.listen(3000, console.info(`Server listening on port ${3000}`));
