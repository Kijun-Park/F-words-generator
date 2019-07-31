import alert from "alert-node";
import Words from "./model/Words";
import routes from "./routes";
import db from "./db";

export const home = (req, res) => {
  res.render("home", { pageTitle: "F word generator" });
};

export const generateWords = async (req, res) => {
  try {
    const terms = await Words.find({});
    const num = Math.floor(Math.random() * terms.length);
    const words = terms[num].words;

    res.render("home", { pageTitle: "F word generator", words });
  } catch (error) {
    console.log(error);
  }
};

export const getAddWords = (req, res) => {
  res.render("addWords", { pageTitle: "addWords" });
};

export const postAddWords = async (req, res) => {
  console.log(req.body);
  const {
    body: { addWords }
  } = req;

  const newWords = await Words.create({
    words: addWords
  });
  alert("Thank you for adding the word.");
  res.redirect(routes.home);
};

export const postReport = (req, res) => {
  console.log(req.body);
};
