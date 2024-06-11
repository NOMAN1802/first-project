import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../../config";
import bcrypt from 'bcrypt'

const loginUser = async (payload: TLoginUser) => {
    // checking if the user is exist
    
    // const user = await User.isUserExistsByCustomId(payload.id);
     const user = await User.isUserExistsByCustomId(payload.id);
     

    if(!user){
        throw new AppError(httpStatus.NOT_FOUND,' This User not found')
    }
     // checking if the user is already deleted

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  };

//  // checking if the user is blocked

 const userStatus = user?.status;

if (userStatus ==="blocked") {
 throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
 };

// //  checking if the password is correct
if(!await User.isPasswordMatch(payload?.password, user?.password)){
    throw new AppError(httpStatus.FORBIDDEN,' Password do not match')
}

//  Access Granted: Send AccessToken ,RefreshToken

// create token and sent to the client 

const jwtPayload = {
    userId: user.id,
    role: user.role,
}
 const accessToken = jwt.sign(
    jwtPayload, 
    config.jwt_access_secret as string, { 
      expiresIn:'10d'

    });

return {
  accessToken,
  needsPasswordChange : user?.
  needsPasswordChange,
}
};

const changePassword = async (userData:JwtPayload, payload: {
  oldPassword: string, newPassword: string,
}) =>{

   // checking if the user is exist
    
    // const user = await User.isUserExistsByCustomId(payload.id);
    const user = await User.isUserExistsByCustomId(userData.userId);
    
   if(!user){
       throw new AppError(httpStatus.NOT_FOUND,' This User not found')
   }
    // checking if the user is already deleted

 const isDeleted = user?.isDeleted;

 if (isDeleted) {
   throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
 };

//  // checking if the user is blocked

const userStatus = user?.status;

if (userStatus ==="blocked") {
throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
};

// //  checking if the password is correct
if(!await User.isPasswordMatch(payload.oldPassword, user?.password)){
   throw new AppError(httpStatus.FORBIDDEN,' Password do not match')
}
//  hashed new password
const newHashedPassword = await bcrypt.hash(payload.newPassword,Number(config.bcrypt_salt_rounds))

   await User.findOneAndUpdate({
  id: userData.userId,
  role: userData.role,
  },{
    password : newHashedPassword,
    needsPasswordChange: false,
    passwordChangeAt: new Date(),
  });
return null;
}

  export const AuthServices = {
    loginUser,
    changePassword,
  };