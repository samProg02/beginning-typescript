
import mongoose, { Document, Model } from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs';
import * as crypto from "crypto";
export interface IUser extends Document {
    email: string;
    password: string;
    passwordConfirm: string;
    passwordChangedAt?: Date;
    role: 'admin' | 'buyer' | 'seller';
    verificationToken?: string;
    verified: boolean;
    active: boolean;
    resetToken: string,
    passwordResetExpires:  number ,
}

interface IUserMethods {
    comparePassword(password: string): Promise<boolean>;
    passwordChangedAfter(issuedAt: number): boolean;
    generateResetToken(): string;
    confirmPassword(candidatePassword: string, givenPassword: string): Promise<boolean>;
}

type UserModel = Model<IUser, {}, IUserMethods>;



const userSchema = new mongoose.Schema<IUser, UserModel>({
    // Your schema definition remains the same
    // ...
    email: {
        type: String,
        required: true,
        validate: {
            validator: function(value: string){
                return validator.isEmail(value)
            },
            message: 'Please enter a valid email'
        },
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8,

    },
    passwordConfirm: {
        type: String,
        required: true,
        validate: {
            validator: function (this: IUser, value: string){
                return this.password === value
            },
            message: 'The password provided are not same'
        }
    },
    passwordChangedAt: Date,
    role: {
        type: String,
        enum: ['admin', 'buyer', 'seller' ],
        required: true,
        default: 'buyer'
    },
    verificationToken: String,
    verified:{
        type: Boolean,
        default: false
    },
    resetToken: {
      type: String,
    },
    passwordResetExpires: {
        type: Number
    },
    active: {
        type: Boolean,
        default: true

    },
}, {
    methods: {
        async comparePassword(this: IUser, password: string) {
            return bcrypt.compare(password, this.password);
        },
        passwordChangedAfter(this: IUser, issuedAt: number): boolean {
            if (this.passwordChangedAt) {
                const changedTimestamp = this.passwordChangedAt.getTime() / 1000;
                return issuedAt < changedTimestamp;
            }
            return false;
        },
        generateResetToken(this: IUser){
            const resetToken = crypto.randomBytes(32).toString('hex')
            this.resetToken =crypto.createHash('sha256').update(resetToken).digest('hex');
            this.passwordResetExpires = Date.now() + (10 * 60 * 60);
            return resetToken;

        },
        async confirmPassword(this: IUser, candidatePassword: string, givenPassword: string): Promise<boolean>{
            try{

                return await bcrypt.compare(givenPassword, candidatePassword);
            }catch (err){
                console.error(err)
                return false
            }

        }
    }
});



userSchema.pre('save', async function ( this: IUser, next){
    if(!this.isModified('password')) next();
    this.password = await bcrypt.hash(this.password, 12)
    // this.passwordChangedAt = new Date();
    this.set('passwordConfirm', undefined)
    next();

})
// userSchema.methods.comparePassword = function(password: string) {
//     return bcrypt.compare(password, this.password)
// }


const Users = mongoose.model<IUser, UserModel>('User', userSchema);

export default Users;
