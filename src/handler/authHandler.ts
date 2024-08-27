import express, {NextFunction, request, Request} from "express";
import Users, {IUser} from "../Schemas/userSchema";
import jwt, {JwtPayload} from 'jsonwebtoken';
import promisify from 'util'
import crypto from "crypto";
import User from "../Schemas/userSchema";
interface CustomRequest extends Request {
    user?: any; // Replace 'any' with the actual type of your user object
}

export const signup = async (request: express.Request, response: express.Response) => {
    try{
        const newUser = await Users.create({
            email: request.body.email,
            password: request.body.password,
            passwordConfirm: request.body.passwordConfirm,
            passwordChangedAt: Date.now() - 3000,


        })

        response.status(200).json({
            status: 'success',
            data: {
                user: newUser
            }
        })
    }catch (err) {
        response.status(404).json({
            status: 'fail',
            error: (err as Error).message
        })
    }
}

export const login = async  (request: express.Request, response: express.Response,) => {
    try{
        if(!request.body.email || !request.body.password) throw new Error('Please fill the field correctly')
        const user = await Users.findOne({email: request.body.email})
        if (!user) throw new Error('User not found you can try signing up');
        // console.log(user)
        if(!await user.comparePassword(request.body.password)) throw new Error('Your password or email is incorrect');

        const token = jwt.sign({id: user._id}, process.env.SECRET as string, {
            expiresIn: process.env.EXPIRES_IN,

        })
        response.cookie('jwt', token, {
            httpOnly: true,

            // expires: new Date(Date.now() + 3600000) //
        })



        response.status(200).json({
            status: 'success',
            token,
            data: {
                user
            }
        })


    }catch (err){
        response.status(404).json({
            status: 'fail',
            error: (err as Error).message,
        })
    }
}

export const protect = async (request: CustomRequest, response: express.Response, next: NextFunction) => {
   try {
        let token: string;
        if (request.headers.authorization && request.headers.authorization.startsWith('Bearer')) {
            token = request.headers.authorization.split(' ')[1];
        } else if (request.cookies.jwt) {
            token = request.cookies.jwt
        }
        if (!token!) next('You\'re not logged in, Please log in ');
        const decoded = await jwt.verify(token!, process.env.SECRET!) as JwtPayload;
        const user = await Users.findById(decoded.id);
        if (!user) next('The user is not real');
        if (user!.passwordChangedAfter(decoded.iat as number)) next('You have changed your password after you login, please login again');

        request.user = user


    }catch (err){
      return
   }


    next();
};


export const forgotPassword = async (request: express.Request, response: express.Response) => {
    let user: IUser
    try{
        const user = await Users.findOne({email: request.body.email});
        if (!user) throw new Error('This user doesn\'nt exist');

        const resetToken = user.generateResetToken();
        user.save({validateBeforeSave: false});
        const resetUrl = `${request.protocol}//${request.get('host')}/api/v1/users/reset-password/${resetToken}`
        const message = `Forgot your password send your patch request with your new password and your confirm password tp ${resetUrl}\n If you didn't forget your password please reject this mail`
        response.status(200).json({
            status: 'success',
            message: 'Token sent to your mail'
        })

    }catch (err) {

        if (user!) {
            user.set('resetToken', undefined)
            user.set('passwordResetExpires', undefined);
            await user.save({validateBeforeSave: false});
        }
        response.status(400).json({
            status: 'fail',
            error: (err as Error).message
        })
    }

}
export const resetPassword = async (request:express.Request, response: express.Response) => {
    try{
        const hashedToken = crypto.createHash('sha256').update(request.params.token).digest('hex');
        const user = await Users.findOne({resetToken: hashedToken, passwordResetExpires: {$gt: Date.now()}})
        if (!user) throw new Error('You were not issued the token try the process again');
        if (!request.body.password || !request.body.passwordConfirm) throw new Error('YOu have to fill the password and passwordconfirm field');

        user.set('password', request.body.password);
        user.set('passwordConfirm', request.body.passwordConfirm);
        user.set('resetToken', undefined);
        user.set('passwordResetExpires', undefined);
        user.set('passwordChangedAt', Date.now() - 3000)
        user.save();
        response.status(200).json({
            status: 'success',
            message: 'Your password have been reset successfully',
        })

    }catch(err){
        response.status(400).json({
            status: 'fail',
            error: (err as Error).message
        })
    }




}


export const updatePassword = async (request:CustomRequest, response: express.Response) =>{
    try{
        const user = await Users.findById(request.user._id)
        // console.log(user!.password, request.body.currentPassword, user!.confirmPassword(request.body.currentPassword, user!.password))
        if (!(await user!.comparePassword(request.body.currentPassword))) throw new Error('The current password you provided is wrong');



        user!.set('password', request.body.password);
        user!.set('passwordConfirm', request.body.passwordConfirm)
        user!.set('passwordChangedAt', Date.now() -3)
        const token = jwt.sign({id: user!._id}, process.env.SECRET as string, {
            expiresIn: process.env.EXPIRES_IN,

        })
        response.cookie('jwt', token, {
            httpOnly: true,

            // expires: new Date(Date.now() + 3600000) //
        })
        user!.save();
        response.status(200).json({
            status: 'success',
            token,
            message: 'password changed correctly'
        })
    }catch (err) {
        response.status(400).json({
            status: 'fail',
            error: (err as Error).message
        })
    }
}

export const userAccess = (...roles: string[]) => {
    return (request:CustomRequest, response: express.Response, next: NextFunction) => {

        if (!roles.includes(request.user?.role)) next('The user do not have the access to this function');
        next()

    }
}

export const logout = async (request: express.Request, response: express.Response) => {
    try {
        // Clear the JWT cookie
        response.clearCookie('jwt', {
            httpOnly: true,
            // secure: true // If using HTTPS
        });

        response.status(200).json({
            status: 'success',
            message: 'Logged out successfully'
        });
    } catch (err) {
        response.status(404).json({
            status: 'fail',
            error: (err as Error).message,
        });
    }
};
