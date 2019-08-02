import routes from "./routes";

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "F words generator";
  res.locals.routes = routes;
  next();
};
