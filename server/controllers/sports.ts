import { SportClass } from "../models/SportClass";
import { Request, Response } from 'express';
import mongoose from "mongoose";
import User from "../models/User";

interface RequestUserAuth extends Request {
    userId?: string,
    role?: string
}

export const createSport = async (req: RequestUserAuth, res: Response) => {
    const sport = req.body;
    if (req.role !== "admin") return res.json({ message: 'Unauthenticated' });
    const newSport = new SportClass({ ...sport, createdAt: new Date().toISOString() });
    try {
        await newSport.save();
        res.status(201).json(newSport);
    } catch (error) {
        res.status(400).json({ message: error });
    }
}


export const updateSport = async (req: RequestUserAuth, res: Response) => {
    const { id: _id } = req.params;
    const sport = req.body;
    if (req.role !== "admin") return res.json({ message: 'Unauthenticated' });
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No sport with that id");
    const updatedSport = await SportClass.findByIdAndUpdate(_id, { ...sport, _id }, { new: true });
    res.json(updatedSport);
}

export const deleteSport = async (req: RequestUserAuth, res: Response) => {
    const { id } = req.params;
    if (req.role !== "admin") return res.json({ message: 'Unauthenticated' });
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send("No post with that id");
    await SportClass.findByIdAndRemove(id);
    res.json({ message: "Sport deleted" });
}

export const createGroup = async (req: RequestUserAuth, res: Response) => {
    const { id } = req.params;
    const group = req.body;
    if (req.role !== "admin") return res.json({ message: 'Unauthenticated' });


    try {
        const sport = await SportClass.findById(id);
        if (!sport?.ageGroups.some(item => group.name === item.name)) {
            sport?.ageGroups.push(group);

            const subdoc = sport?.ageGroups[0];
            subdoc?.isNew;

            sport?.save(function (err) {
                if (err) console.log(err);
                console.log('Success!');
            });

            res.status(200).json(sport)

        } else {
            console.log("GROUP ALREADY EXISTS")
        }
    } catch (error) {
        res.status(404).json({ message: error });

    }
}

export const deleteGroup = async (req: RequestUserAuth, res: Response) => {
    const { id } = req.params;
    const { groupId } = req.params;
    if (req.role !== "admin") return res.json({ message: 'Unauthenticated' });

    try {
        await SportClass.findByIdAndUpdate(id, {
            '$pull': {
                'ageGroups':{ '_id': groupId }
            }
        });
    } catch (error) {
        res.status(404).json({ message: error });

    }
}


export const editGroup = async (req: RequestUserAuth, res: Response) => {
    const { id } = req.params;
    const { groupId } = req.params;
    const { group } = req.body;
    if (req.role !== "admin") return res.json({ message: 'Unauthenticated' });

    try {
        const sport = await SportClass.findOneAndUpdate(
            {
                "_id": id, 'ageGroups._id': groupId
            },
            {
                'ageGroups.$': group
            }, { new: true }
        ).then(res => console.log(res)).catch(err => console.log(err))
        res.status(200).json(sport)
    } catch (error) {
        res.status(404).json({ message: error });

    }
}


export const getSportGroup = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { groupId } = req.params;

    try {
        const sport = await SportClass.findById(id)
        const groupRes = sport?.ageGroups.find(g => g._id == groupId)
        res.status(200).json(groupRes)
    } catch (error) {
        res.status(404).json({ message: error });

    }
}


export const getSports = async (req: Request, res: Response) => {
    try {
        const sports = await SportClass.find();
        res.status(200).json(sports)
    } catch (error) {
        res.status(404).json({ message: error });

    }
}

export const getSport = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const sport = await SportClass.findById(id);
        res.status(200).json(sport);
    } catch (error) {
        res.status(404).json({ message: error })

    }
}

export const getTermByGroup = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const sports = await SportClass.findById(id);
        const ageGroups = sports?.ageGroups;
        res.status(200).json(ageGroups)
    } catch (error) {
        res.status(404).json({ message: error });

    }
}

export const getSportsBySearch = async (req: Request, res: Response) => {
    const { searchQuery }: any = req.query;
    const { age }: any = req.query;
    let arr = searchQuery.split(',');
    let ageArr = age.split(',');

    try {
        if (age === '') {
            const sports = await SportClass.find({
                name: arr
            });
            res.status(200).json(sports)
        } else if (searchQuery === '') {
            const sports = await SportClass.find({
                "ageGroups.name": ageArr
            })
            res.status(200).json(sports)

        } else if (age === '' && searchQuery === '') {
            const sports = await SportClass.find();
            res.status(200).json(sports)
        }
        const sports = await SportClass.find({
            $and: [
                { name: arr },
                { "ageGroups.name": ageArr }
            ]
        });
        res.status(200).json(sports)
    } catch (error) {
        res.status(404).json({ message: error });

    }
}

export const commentSport = async (req: Request, res: Response) => {
    const { id } = req.params;
    const value = req.body;
    try {

        const sport = await SportClass.findById(id);
        sport!.comments.push(value.comment);
        const updatedSport = await SportClass.findByIdAndUpdate(id, sport!, { new: true });
        res.status(200).json(updatedSport)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const rateSport = async (req: Request, res: Response) => {
    const { id } = req.params;
    const value = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No sport with that ID');
        const sport = await SportClass.findById(id);
        sport?.rating.push(value.rating)
        const updatedSport = await SportClass.findByIdAndUpdate(id, sport!, { new: true });
        res.json(updatedSport);
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const enrollSport = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { id } = req.params;
    const { group } = req.params;
    try {
        const user = await User.findById(userId)
        if (user!.classesEnrolled.length > 2) {
            res.status(404).json({ message: "Cannot enroll any more classes!" })
        }

        const sports = await SportClass.find({
            $and: [
                { _id: id },
                { "ageGroups.enrolledUsers": userId }
            ]
        })



        if (sports.length === 0 && user!.classesEnrolled.length < 2) {
            const sport = await SportClass.findOneAndUpdate({
                $and: [
                    { _id: id },
                    { "ageGroups.name": group }
                ]
            }, {
                $push: {
                    "ageGroups.$.enrolledUsers": userId
                }
            });
            user?.classesEnrolled.push(id);
            const updatedUser = await User.findByIdAndUpdate(userId, user!, { new: true });
            console.log(sport)

            console.log(updatedUser)
            res.status(200).json("SUCCESS")

        } else {
            console.log("Cannot enroll")
        }

    } catch (error) {
        res.status(404).json({ message: error })
    }
}


export const unEnrollSport = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { id } = req.params;
    try {
        const sports = await SportClass.find({
            $and: [
                { _id: id },
                { "ageGroups.enrolledUsers": userId }
            ]
        })

        const jsonSport = JSON.parse(JSON.stringify(sports));
        const enrolledGroup = jsonSport[0].ageGroups.find((g: any) => g.enrolledUsers.includes(userId))

        if (sports.length > 0) {
            const sport = await SportClass.findOneAndUpdate({
                $and: [
                    { _id: id },
                    { "ageGroups.name": enrolledGroup.name }
                ]
            }, {
                $pull: {
                    "ageGroups.$.enrolledUsers": userId
                }
            });

            const user = await User.findOneAndUpdate({ classesEnrolled: id }, { $pull: { classesEnrolled: id } }, { new: true });
        
            console.log("Removed from group");
            console.log(user)
            res.status(200).json(sport)
        } else {
            console.log("error")
        }

    } catch (error) {
        res.status(404).json({ message: error })
    }
}


export const checkEnrolled = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { id } = req.params;
    try {
        const sports = await SportClass.find({
            $and: [
                { _id: id },
                { "ageGroups.enrolledUsers": userId }
            ]
        })
        const group = JSON.parse(JSON.stringify(sports))
        console.log(group)
        var enrolled = false;
        if (sports.length > 0) {
            enrolled = true;

        }
        res.status(200).json(enrolled);

    } catch (error) {
        res.status(404).json({ message: error })
    }
}


export const getEnrolledUsers = async (req: RequestUserAuth, res: Response) => {
    const { id } = req.params;
    const { group } = req.params;
    if (req.role !== "admin") return res.json({ message: 'Unauthenticated' });

    try {
        const sports = await SportClass.findById(id);
        const groupRes = sports?.ageGroups.find(g => g.name === group)
        async function getEnrolled() {
            var usersList: string[] = []
            let promise = new Promise((resolve, reject) => {
                groupRes?.enrolledUsers.forEach(async (user) => {
                    const enrolledUser = await User.findById(user)
                    usersList.push(enrolledUser!.name)
                })
                setTimeout(() => resolve("done!"), 1000)

            })
            let result = await promise
            console.log(result)
            res.status(200).json(usersList);
        }
        getEnrolled();
    } catch (error) {
        res.status(404).json({ message: error });
    }
}



