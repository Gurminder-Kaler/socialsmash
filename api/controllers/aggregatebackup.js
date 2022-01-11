
//@public
//@usage : signUp The user.
// exports.signUp = (req, res) => {
//     const {
//         errors,
//         isValid
//     } = signUpValidator(req.body);
//     // Check Validation
//     if (!isValid) {
//         // Return any errors with 400 status
//         // console.log('errs', errors);
//         return res.json({
//             status: 400,
//             success: false,
//             message: errors,
//         });
//     }
//     User.find({
//         email: req.body.email
//     })
//     .exec()
//     .then(user => {
//         if (user.length >= 1) {
//             return res.json({
//                 status: 409,
//                 success: false,
//                 message: messages.FAILURE.EMAIL_ALREADY_TAKEN
//             });
//         } else {
//             User.find({
//                 userName: req.body.userName
//             })
//             .exec()
//             .then(checkUserName => {
//                 if (checkUserName.length >= 1) {
//                     return res.json({
//                         status: 409,
//                         success: false,
//                         message: messages.FAILURE.USERNAME_ALREADY_TAKEN
//                     });
//                 } else {
//                     User.find({
//                         mobileNo: req.body.mobileNo
//                     })
//                     .exec()
//                     .then(checkMobileNo => {
//                         if (checkMobileNo.length >= 1) {
//                             return res.json({
//                                 status: 409,
//                                 success: false,
//                                 message: messages.FAILURE.MOBILE_ALREADY_TAKEN
//                             });
//                         } else {
//                             bcrypt.hash(req.body.password, 10, (err, hash) => {
//                                 if (err) {
//                                     return res.json({
//                                         status: 500,
//                                         success: false,
//                                         message: err
//                                     });
//                                 } else {
//                                     // code here
//                                     const uniqueId = Math.random();
//                                     const user = new User({
//                                         _id: new mongoose.Types.ObjectId(),
//                                         firstName: req.body.firstName,
//                                         lastName: req.body.lastName,
//                                         dob: req.body.dob,
//                                         userName: req.body.userName,
//                                         mobileNo: req.body.mobileNo,
//                                         accountType: req.body.accountType,
//                                         email: req.body.email,
//                                         role: req.body.role,
//                                         uniqueId: uniqueId,
//                                         password: hash
//                                     });
//                                     user
//                                     .save()
//                                     .then(result => {
//                                         if (result) {
//                                             const profile = new Profile({
//                                                     user: result._id
//                                             })
//                                             .save()
//                                             .then(profResult => {
//                                                 res.json({
//                                                     status:201,
//                                                     success: true,
//                                                     message: messages.SUCCESS.USER.CREATED,
//                                                     data: {
//                                                         _id: result._id,
//                                                         firstName: result.firstName,
//                                                         lastName: result.lastName,
//                                                         dob: result.dob,
//                                                         userName: result.userName,
//                                                         mobileNo: result.mobileNo,
//                                                         accountType: result.accountType,
//                                                         role: result.role,
//                                                         email: result.email,
//                                                         uniqueId: result.uniqueId,
//                                                         createdAt: result.createdAt,
//                                                         updatedAt: result.updatedAt,
//                                                         countryCode: profile.countryCode,
//                                                         status: profile.status,
//                                                         isActive: profile.isActive,
//                                                         createdAt: profile.createdAt,
//                                                         updatedAt: profile.updatedAt,
//                                                     }
//                                                 });
//                                             });
//                                         }
//                                     })
//                                     .catch(err => {
//                                         return res.json({
//                                             status: 500,
//                                             success: false,
//                                             message: err
//                                         });
//                                     });
//                                 }
//                             });
//                         }
//                     });
//                 }
//             });
//         }
//     });
// }
 // User.aggregate([
	// 	{
	// 		$lookup : {
	// 			from : "profiles",
	// 			as: "profile",
	// 			let: {user: "$_id"},
	// 			pipeline: [
	// 				{$match: {$expr: {$eq: ['$user','$$user']}}}
	// 			]
	// 		}
	// 	},
	// 	{
	// 		$project: {
	// 			_id: 1,
	// 			firstName: 1,
	// 			email : 1,
	// 			profile: 1
	// 		}
	// 	},
	// 	{ $limit: 100 }
	// ]).exec((err, result)=> {
	// 	const data = {
	// 		count: result.length,
	// 		result: result.map(result => {
	// 			return result
	// 		})
	// 	};
	// 	if (result.length >= 0) {
	// 		res.status(200).json({
	// 			success: true,
	// 			data: data,
	// 			message: messages.SUCCESS.USER.FETCHED
	// 		});
	// 	} else {
	// 		res.status(404).json({
	// 			success: false,
	// 			message: messages.FAILURE.USER_NOT_FOUND
	// 		});
	// 	}
	// })