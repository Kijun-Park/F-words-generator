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

export const getAdmin = async (req, res) => {
  try {
    const adds = await Added.find({});
    const reports = await Report.find({});
    res.render("admin", { pageTitle: "admin", adds, reports });
  } catch (error) {
    console.log(error);
    res.render("admin", { pageTitle: "admin", adds: [], reports: [] });
  }
};

export const postAdmin = async (req, res) => {
  const {
    body: { isDelete: reports, isAdd: adds }
  } = req;

  if (!reports && !adds) {
    res.redirect(routes.admin);
  }

  try {
    if (adds) {
      console.log(Words.findOne(adds));
      if (Array.isArray(adds)) {
        adds.map(async item => {
          await Words.create({
            words: item
          });
          await Added.findOneAndRemove(item);
        });
      }
    }
    if (reports) {
      await Words.findOneAndRemove(reports);
      await Report.findOneAndRemove(reports);
    }

    res.redirect(routes.admin);
  } catch (error) {
    console.log(error);
    res.redirect(routes.admin);
  }
};
