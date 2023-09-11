import mongoose,{Document} from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        id:{type:String},
        name: {type:String, required:true},
        email:{type:String, required:true},
        password:{type:String, required: true},
        role: {
            type:String,
            enum: ['user','admin'],
            default: 'user',
           required:true
        },
        classesEnrolled: {type:[String],validate: [arrayLimit, '{PATH} exceeds the limit of 2']},
        verified: {type:Boolean, default:false}

    }
)

function arrayLimit(val: []) {
    return val.length <= 2;
}

interface IUser extends Document{
    id:string,
    name: string,
    email: string,
    password:string,
    role:string
    classesEnrolled:[string],
    verified: boolean
}

const User = mongoose.model<IUser>('User', userSchema);
export default User;