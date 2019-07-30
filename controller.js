import routes from "./routes";

export const home = (req, res) => {
  res.render("home", { pageTitle: "F word generator" });
};

export const getAddWords = (req, res) => {
  res.render("addWords", { pageTitle: "addWords" });
};

export const postAddWords = (req, res) => {
  console.log(req.body);
};

export const postReport = (req, res) => {
  console.log(req.body);
};
