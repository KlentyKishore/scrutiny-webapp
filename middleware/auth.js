const jwt = require('jsonwebtoken');

const passport = require("../passport");
const db = require("../models");


const Auth=
		{
			isAuthenticatedUser:function () {
				return passport.authenticate('user_jwt', { session: false })
			},
			isAuthenticated: function () {
				return async (req,res,next)=>{
					try{
						let token=req.headers["authorization"]
						if(token){
							token=token.split("Bearer ")[1]
							if(token){
								user=jwt.verify(token,"test")
								if(user){
									req.user=await db.User.findOne({_id:user.id}) ;
								}
							}
						}
					}catch{
						console.log("Error at isAuthenticated")
					}
					if(!req.user){
						req.user={}
					}
					next()
				}
			},
			isAdmin:function(){
				return (req,res,next)=>{
					if(req.user.role === 'admin'){
						next()
					}
					res.send(401)
				}
			}
		}
module.exports = Auth;