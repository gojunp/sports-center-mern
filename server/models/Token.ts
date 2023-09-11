import mongoose, { ObjectId } from "mongoose";
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user",
        unique: true,
    },
    token: {type:String, required:true},
    createdAt: {type: Date, default: Date.now(),expires: 3600}
});

interface IToken extends Document {
    userId: ObjectId,
    token: string,
    createdAt: Date
}

const Token = mongoose.model<IToken>('Token', tokenSchema);

export default Token;
