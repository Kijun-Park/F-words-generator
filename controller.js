import Words from "./model/Words";
import Added from "./model/Added";
import Report from "./model/Reports";
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

  if ((await Added.exists({ words: addWords })) === false) {
    const newAdd = await Added.create({
      words: addWords
    });
  }

  res.redirect(routes.home);
};

export const postReport = async (req, res) => {
  const {
    body: { reportWords }
  } = req;
  if ((await Report.exists({ words: reportWords })) === false) {
    const newReport = await Report.create({
      words: reportWords
    });
  }

  res.redirect(routes.home);
};
