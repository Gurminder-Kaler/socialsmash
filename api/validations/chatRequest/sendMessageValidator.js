const Validator = require("validator");
const isEmpty = require("../is-empty");

module.exports = function lockGroupViaUserIdValidator(payload) {
  let errors = {};
  console.log("payload", payload);
  if (!Validator.isIn(payload.type, ["one_to_one", "many_to_many"])) {
    errors.type = "Type can either be one_to_one or many_to_many";
  } else {
    if (payload.type == "many_to_many") {
      payload.groupId = !isEmpty(payload.groupId) ? payload.groupId : "";

      if (Validator.isEmpty(payload.groupId)) {
        errors.groupId = "Group Id is required";
      }
    } else {
      payload.receiverId = !isEmpty(payload.receiverId)
        ? payload.receiverId
        : "";

      if (Validator.isEmpty(payload.receiverId)) {
        errors.receiverId = "Receiver Id is required";
      }
    }

    payload.message = !isEmpty(payload.message) ? payload.message : "";

    if (Validator.isEmpty(payload.message)) {
      errors.message = "Message is required";
    }

    payload.senderId = !isEmpty(payload.senderId) ? payload.senderId : "";

    if (Validator.isEmpty(payload.senderId)) {
      errors.senderId = "Sender Id is required";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
