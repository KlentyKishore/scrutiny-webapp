const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
var validator = require("validator");
const passport = require("passport");

const Util = require("../util/Util");

const Admin = {
  getAllUsers: function (req, res) {
    db.User.find({}, "name email role isEmailVerified").then((users) => {
      res.send({ status: "sucess", msg: users });
    });
  },

  updateUserRole: function (req, res) {
    db.User.findOneAndUpdate(
      { email: req.body.email },
      { role: req.body.role }
    ).then(() => {
      res.send({ status: "sucess", msg: "ok" });
    });
  },
  getAllAccessList: function (req, res) {
    db.EditAccess.find({}).then((accessList) => {
      res.send({ status: "sucess", msg: accessList });
    });
  },
  giveAccess: function (req, res) {
    if (req.body.questionId && req.body.email) {
      db.Question.findOneAndUpdate(
        { _id: req.body.questionId },
        { $addToSet: { editAccess: req.body.email } }
      ).then((rr) => {
        db.EditAccess.findOneAndUpdate(
          { questionId: req.body.questionId, email: req.body.email },
          { acessGiven: true }
        ).then(() => {
          res.send({ status: "ok", msg: "Access Given" });
        });
      });
    }
  },
  revokeAccess: function (req, res) {
    if (req.body.questionId && req.body.email) {
      db.Question.findOneAndUpdate(
        { _id: req.body.questionId },
        { $pull: { editAccess: req.body.email } }
      ).then((ress) => {
        console.log("sar",ress)
        db.EditAccess.findOneAndUpdate(
          { questionId: req.body.questionId, email: req.body.email },
          { acessGiven: false }
        ).then(() => {
          res.send({ status: "ok", msg: "Access Revoked" });
        });
      });
    }
  },
  deleteAccess:function (req, res) {
    if (req.body.accessId) {
        db.EditAccess.deleteOne({ _id: req.body.accessId})
        .then(() => {
          res.send({ status: "ok", msg: "Access deleted" });
        });
    }
  },
};

module.exports = Admin;
