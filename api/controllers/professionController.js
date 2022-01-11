const {
  getAllProfessionsServiceFunc,
  updateProfessionServiceFunc,
  addProfessionServiceFunc
} = require('@services/professionService')

//@private
//@usage get all the professions from the database.
exports.getAllProfessions = async (req, res) => {
  try {
    return await getAllProfessionsServiceFunc(req, res)
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err
    })
  }
}

//@private
//@usage update profession in db
exports.updateProfession = async (req, res) => {
  try {
    return await updateProfessionServiceFunc(req, res)
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err
    })
  }
}

//@private
//@usage add profession to db
exports.addProfession = async (req, res) => {
  try {
    return await addProfessionServiceFunc(req, res)
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err
    })
  }
}
