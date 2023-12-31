const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const { host, sentry } = require("./config/config");
const port = host.port;
const cors = require("cors");
const errorHandler = require("./middlewares/error-handler");
const Sentry = require("@sentry/node");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output");
require("express-async-errors");

app.use(express.static("public"));

//chat1
const socket = require("socket.io");
const server = app.listen(port, () => {
  console.log(`running https://mukjachi.site:6443:${port}`);
});
const io = socket(server, { path: "/socket.io" });

// parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// sentry
Sentry.init({
  dsn: sentry.dsn,
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
app.use(Sentry.Handlers.errorHandler());

// cors
app.use(
  cors({
    origin: [
      "https://mukjachi.site:6443:3000",
      "http://52.78.56.220:3000",
      "https://www.dawhisky.com",
      "https://dawhisky-fe.vercel.app",
      "https://dawhisky-test.vercel.app",
      "https://dawhisky-pwa.vercel.app",
    ],
    credentials: "true",
  })
);

// router
const apiMainRouter = require("./routes/index");
app.use("/api", [apiMainRouter]);

// errorHandler
app.use(errorHandler);

// swagger
app.use("/api/swag", swaggerUi.serve, swaggerUi.setup(swaggerFile));

//chat2
const socketHandler = require("./modules/socket-handler");
socketHandler(io);

module.exports = app;