import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import routes from "./routes";
import router from "./router";
import { localsMiddleware } from "./middlewares";

const app = express();

const port = process.env.PORT || 2000;

app.use(helmet());
app.set("view engine", "pug");
app.use("/static", express.static("static"));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(localsMiddleware);

app.use(routes.home, router);

app.listen(port, () => {
  console.log(`listening on port : http://localhost:${port}`);
});
