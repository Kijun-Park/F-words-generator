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
    if (terms.length === 0) {
      res.redirect(routes.home);
    }
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

export const getLogin = (req, res) => {
  res.render("login", { pageTitle: "Admin Login" });
};

export const postLogin = (req, res) => {
  res.redirect(routes.admin);
};

export const getAdmin = async (req, res) => {
  try {
    const adds = await Added.find({});
    const reports = await Report.find({});
    const words = await Words.find({});

    res.render("admin", { pageTitle: "admin", adds, reports, words });
  } catch (error) {
    console.log(error);
    res.render("admin", {
      pageTitle: "admin",
      adds: [],
      reports: [],
      words: []
    });
  }
};

export const postAdmin = async (req, res) => {
  const {
    body: { isDelete: reports, isAdd: adds, isWord: words }
  } = req;

  if (!reports && !adds && !words) {
    res.redirect(routes.admin);
  }

  try {
    if (adds) {
      if (req.body.delete) {
        if (Array.isArray(adds)) {
          adds.map(async item => {
            console.log(Added.findOne(item));
            await Added.findOneAndRemove(item);
          });
        } else {
          await Added.findOneAndRemove(adds);
        }
      } else {
        if (Array.isArray(adds)) {
          adds.map(async item => {
            await Words.create({
              words: item
            });
            await Added.findOneAndRemove(item);
          });
        } else {
          await Words.create({
            words: adds
          });
          await Added.findOneAndRemove(adds);
        }
      }
    }

    if (reports) {
      if (req.body.delete) {
        if (Array.isArray(reports)) {
          reports.map(async item => {
            await Report.findOneAndRemove(item);
          });
        } else {
          await Report.findOneAndRemove(reports);
        }
      } else {
        if (Array.isArray(reports)) {
          reports.map(async item => {
            await Report.findOneAndRemove(item);
            await Words.findOneAndRemove(item);
          });
        } else {
          await Report.findOneAndRemove(reports);
          await Words.findOneAndRemove(reports);
        }
      }
    }
    if (words) {
      if (Array.isArray(words)) {
        words.map(async item => {
          await Words.findOneAndRemove(item);
        });
      } else {
        await Words.findOneAndRemove(words);
      }
    }
    res.redirect(routes.admin);
  } catch (error) {
    console.log(error);
    res.redirect(routes.admin);
  }
};
