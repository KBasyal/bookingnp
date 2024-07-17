const Joi =require("joi")
require('dotenv').config()
const mailSvc = require("../../services/mail.service");

const authSvc = require("./auth.service")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
class AuthController{
    register=async(req,res,next) =>{

        try{
            const data =authSvc.transformRegisterData(req)
            // to do : db store
            const registeredData = await authSvc.createUser(data);
            await mailSvc.sendEmail(
                registeredData.email,
                "Activate your Account",
                `Dear ${registeredData.name} <br />
                <p> You have registered your account with username <strong> ${registeredData.email}</p>
                <p> Please click the link below or copy and paste the url in the browser to activate your account </p>
                <a href="${process.env.FRONTEND_URL}/activate/${registeredData.activationToken}">
                ${process.env.FRONTEND_URL}/activate/${registeredData.activationToken}</a></br>
                <p> Regards, </p>
                <p>${process.env.SMTP_FROM}</p>
                <p><small><em>please donot reply to thsi email via any mail service.</em></small></p>`
            )
            res.json({
                result:registeredData,
                message:"Register success",
                meta: null
            })

        }catch (exception){
            console.log(exception)
            next(exception)

        }

    }
    login=async(req, res, next)=>{
        try{
            const {email, password}= req.body;
            const userDetail = await authSvc.findOneUser({
                email: email
            })
            // if user dosenot exist
            if(!userDetail){
                throw{code :400, message :"User does not exisits"}
            }
            // user do exists
            if (bcrypt.compareSync(password, userDetail.password)){
                // password match
                if(userDetail.status !== 'active'){
                    throw {code: 400, message:"Your account has not been activated. Please activate or contact administration "}
                }
                const accessToken = jwt.sign({
                    sub: userDetail._id
                }, process.env.JWT_SECRET)
                const refreshToken = jwt.sign({
                    sub: userDetail._id
                }, process.env.JWT_SECRET,{
                    expiresIn:"1d"
                })
                res.json({
                    result:{
                        detail:{
                            _id : userDetail._id,
                            name: userDetail.name,
                            email: userDetail.email,
                            role: userDetail.role,
                            status:userDetail.status,
                            image: userDetail.image
                        },
                        token:{
                            accessToken:accessToken,
                            refreshToken:refreshToken
                        }
                        
                    },
                    message:"login successful",
                    meta:null


                })
            }else{
                throw{code :400, message:"Credentail doesnot match"}
                
            }
        }catch(exception){
            next(exception)
        }
        
        // to do : data validation
        // to do : db query execute
        // to do :otp create
        // to do jwt token generate
        // to do : clinet response

    }
    activate = async(req, res, next)=>{
        try{
            const token= req.params.token
            const associatedUser =await authSvc.findOneUser({
                activationToken: token
            })
            if(!associatedUser){
                throw{code:400, message:"Token does not match"}
            }
            const updatedResult = await authSvc.updateUser({
                activationToken:null,
                status:  "active",
            }, associatedUser._id);
            // to do : user identify
            // to do : activate
            // activationToken:===> null
            res.json({
                result:updatedResult,
                message:"Your account has been activated successfully",
                meta:null
            })
        }catch (exception){
            next(exception)
        }
    } 
    getLoggedIn= async (req, res, next)=>{
        try{

            const loggedInUser = req.authUser;
            const response={
                _id: loggedInUser._id,
                name: loggedInUser.name,
                email: loggedInUser.email,
                role: loggedInUser.role,
                status: loggedInUser.status
               
            }
            res.json({
                result: response,
                message: " your profile",
                meta: null
            })

        }catch(exception){

        }

    }
    adminAccess= async(req, res, next)=>{
        try{
            res.json({
                result :"I am only accessed by admin",
                message:"Admin only",
                meta : null
            })
        }catch(exception){
            next(exception)

        }

    }
}
const authCtrl = new AuthController()
module.exports = authCtrl;