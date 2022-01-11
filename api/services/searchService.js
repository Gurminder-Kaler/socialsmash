const mongoose = require("mongoose");
const User = require("@models/userModel");
const Company = require("@models/companyModel");
const messages = require("@constants/messages");
const isEmpty = require("@validations/is-empty");
const searchPeopleValidator = require("@validations/searchRequest/searchPeopleValidator");
const searchCompanyValidator = require("@validations/searchRequest/searchCompanyValidator");
const {
  getAllFriendsViaUserIdServiceFunc,
} = require("@services/friendRequestService");

const searchPeopleServiceFunc = async (req, res) => {
  try {
    const { errors, isValid } = searchPeopleValidator(req.body);
    if (!isValid) {
      return res.json({
        status: 400,
        success: false,
        message: errors,
      });
    }
    let friendsUserIds = [];

    const type = req.body.type; // Type - my_friends or find_new_people
    const keyword = req.body.keyword; // Type - my_friends or find_new_people
    let regex = new RegExp(keyword);

    let sentAcceptedRequests = await FriendRequest.find({
      status: "accepted",
      sender: mongoose.Types.ObjectId(req.body.userId),
    })
      .lean()
      .exec(); //3

    let receivedAcceptedRequests = await FriendRequest.find({
      status: "accepted",
      receiver: mongoose.Types.ObjectId(req.body.userId),
    })
      .lean()
      .exec(); //4

    for (let i = 0; i < sentAcceptedRequests.length; i++) {
      friendsUserIds.push(sentAcceptedRequests[i].receiver);
    }
    for (let i = 0; i < receivedAcceptedRequests.length; i++) {
      friendsUserIds.push(receivedAcceptedRequests[i].sender);
    }

    if (type == "my_friends") {
      let myFriends = await User.find({ _id: { $in: friendsUserIds } })
        .or([
          { firstName: { $regex: regex, $options: "i" } },
          { accountType: { $regex: regex, $options: "i" } },
          { maritalStatus: { $regex: regex, $options: "i" } },
        ])
        .lean()
        .exec(); //1
      res.json({
        success: true,
        status: 200,
        message: messages.SUCCESS.PEOPLE.FOUND,
        data: myFriends,
      });
    }
    if (type == "find_new_people") {
      let notMyFriends = await User.find({ _id: { $nin: friendsUserIds } })
        .or([
          { firstName: { $regex: regex, $options: "i" } },
          { accountType: { $regex: regex, $options: "i" } },
          { maritalStatus: { $regex: regex, $options: "i" } },
        ])
        .lean()
        .exec(); //1
      console.log("myfriends", notMyFriends);
      res.json({
        success: true,
        status: 200,
        message: messages.SUCCESS.PEOPLE.FOUND,
        data: notMyFriends,
      });
    }
  } catch (err) {
    res.json({
      status: 500,
      success: false,
      message: err,
    });
  }
};

const searchCompanyServiceFunc = async (req, res) => {
  try {
    const { errors, isValid } = searchCompanyValidator(req.body);
    if (!isValid) {
      return res.json({
        status: 400,
        success: false,
        message: errors,
      });
    }

    const type = req.body.type; // Type - my_companies or find_new_people
    const keyword = req.body.keyword; // Type - my_companies or find_new_people
    let regex = new RegExp(keyword);

    if (type == "my_companies") {
      let companies = await Company.find({
        status: "visible",
        createdBy: mongoose.Types.ObjectId(req.body.userId),
      })
        .or([
          { firstName: { $regex: regex, $options: "i" } },
          { accountType: { $regex: regex, $options: "i" } },
          { maritalStatus: { $regex: regex, $options: "i" } },
        ])
        .lean()
        .exec(); //1
      res.json({
        success: true,
        status: 200,
        message: messages.SUCCESS.PEOPLE.FOUND,
        data: companies,
      });
    }
    if (type == "find_new_company") {
      let companies = await User.find({ _id: { $nin: friendsUserIds } })
        .or([
          { firstName: { $regex: regex, $options: "i" } },
          { accountType: { $regex: regex, $options: "i" } },
          { maritalStatus: { $regex: regex, $options: "i" } },
        ])
        .lean()
        .exec(); //2
      res.json({
        success: true,
        status: 200,
        message: messages.SUCCESS.PEOPLE.FOUND,
        data: companies,
      });
    }
  } catch (err) {
    res.json({
      status: 500,
      success: false,
      message: err,
    });
  }
};

module.exports = {
  searchPeopleServiceFunc,
  searchCompanyServiceFunc,
};
