import cookie from "cookie-parser";
import Words from "./model/Words";
import Added from "./model/Added";
import Report from "./model/Reports";
import routes from "./routes";
import db from "./db";

export const home = (req, res) => {
  res.render("home", { pageTitle: "Home" });
};

export const generateWords = async (req, res) => {
  try {
    const terms = await Words.find({});
    if (terms.length === 0) {
      res.redirect(routes.home);
    }
    const num = Math.floor(Math.random() * terms.length);
    const words = terms[num].words;

    res.render("home", { pageTitle: "Home", words });
  } catch (error) {
    console.log(error);
  }
};

export const getAddWords = (req, res) => {
  res.render("addWords", { pageTitle: "Add Words" });
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
  if (req.cookies.isLoggedIn) {
    res.redirect(routes.admin);
  } else {
    res.render("login", { pageTitle: "Admin Login" });
  }
};

export const postLogin = (req, res) => {
  const {
    body: { id, password }
  } = req;
  if (id === process.env.ADMIN_ID && password === process.env.ADMIN_PASSWORD) {
    res.cookie("isLoggedIn", true);
    res.redirect(routes.admin);
  } else {
    res.redirect(routes.login);
  }
};

export const logout = (req, res) => {
  console.log(req.cookies);
  res.clearCookie("isLoggedIn");
  res.redirect(routes.home);
};

export const getAdmin = async (req, res) => {
  if (!req.cookies.isLoggedIn) {
    res.redirect(routes.login);
  }
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
            await Added.findOneAndRemove({ words: item });
          });
        } else {
          await Added.findOneAndRemove({ words: adds });
        }
      } else {
        if (Array.isArray(adds)) {
          adds.map(async item => {
            await Words.create({
              words: item
            });
            await Added.findOneAndRemove({ words: item });
          });
        } else {
          await Words.create({
            words: adds
          });
          await Added.findOneAndRemove({ words: adds });
        }
      }
    }

    if (reports) {
      if (req.body.delete) {
        if (Array.isArray(reports)) {
          reports.map(async item => {
            await Report.findOneAndRemove({ words: item });
          });
        } else {
          await Report.findOneAndRemove({ words: reports });
        }
      } else {
        if (Array.isArray(reports)) {
          reports.map(async item => {
            await Report.findOneAndRemove({ words: item });
            await Words.findOneAndRemove({ words: item });
          });
        } else {
          await Report.findOneAndRemove({ words: reports });
          await Words.findOneAndRemove({ words: reports });
        }
      }
    }
    if (words) {
      if (Array.isArray(words)) {
        words.map(async item => {
          await Words.findOneAndRemove({ words: item });
        });
      } else {
        await Words.findOneAndRemove({ words });
      }
    }
    res.redirect(routes.admin);
  } catch (error) {
    console.log(error);
    res.redirect(routes.admin);
  }
};
