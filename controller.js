import routes from "./routes";
import db from "./db";

export const home = (req, res) => {
  res.render("home", { pageTitle: "F word generator" });
};

export const generateWords = (req, res) => {
  const num = Math.floor(Math.random() * db.length);
  console.log(num);
  res.render("home", {
    words: db[num].word
  });
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
