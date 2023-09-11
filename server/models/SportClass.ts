import mongoose, { Document } from "mongoose";

const Schema = mongoose.Schema;


const ageGroupSchema = new Schema({
    id: { type: String },
    name:
    {
        type: String,
        enum: ['Children', 'Youth', 'Young adults', 'Adults'],
        required: true
    },
    day1: {
        type: String, required: true
    },
    time1: {
        type: String, required: true
    },
    day2: {
        type: String, required: true
    },
    time2: {
        type: String, required: true
    },
    day3: {
        type: String, required: true
    },
    time3: {
        type: String, required: true
    },
    enrolledUsers: {
        type: [String], default: []
    }
})

const ratingSchema = new Schema(
    {
        userId: { type: String, required: true },
        rating: { type: Number, required: true }
    }
)

const sportClassSchema = new Schema(
    {
        id: { type: String },
        name: { type: String, required: true },
        photo: { type: String, required: true },
        description: { type: String, required: true },
        ageGroups: { type: [ageGroupSchema], default: [], validate: [arrayLimit, '{PATH} exceeds the limit of 10'] },
        comments: { type: [String], default: [] },
        rating: { type: [Number], default: [] },
        visible: { type: Boolean, required: true },
        createdAt: {
            type: Date,
            default: new Date()
        },
    }
)

function arrayLimit(val: []) {
    return val.length <= 10;
}

export interface ISportClass extends Document {
    id: string,
    name: string,
    photo: string,
    description: string,
    ageGroups: [IAgeGroup],
    comments: [string],
    rating: [Number],
    visible: boolean
}

interface IAgeGroup extends Document {
    id: string,
    name: string,
    day1: string,
    time1: string,
    day2: string,
    time2: string,
    day3: string,
    time3: string,
    enrolledUsers: [string]
}

interface IRating extends Document {
    userId: string,
    rating: number
}


export const SportClass = mongoose.model<ISportClass>('SportClass', sportClassSchema);

export const AgeGroup = mongoose.model<IAgeGroup>('AgeGroup', ageGroupSchema);

export const Rating = mongoose.model<IRating>('Rating', ratingSchema);

