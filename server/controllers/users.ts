import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import crypto from 'crypto';
import Token from '../models/Token';
import { sendEmail } from '../utils/sendEmail'

export const signup = async (req: Request, res: Response) => {
    const { email, password, firstName, lastName, role, confirmPassword } = req.body;
    const isAdminCreation = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });
        if (password !== confirmPassword) return res.status(400).json({ message: 'Passwords do not match' });
        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}`, role });
        const token = await new Token({
            userId: result._id,
            userRole: result.role,
            token: crypto.randomBytes(32).toString("hex")
        }).save();
        const url = `${process.env.BASE_URL}users/${result._id}/verify/${token.token}`
        await sendEmail(result.email, "Verify Email", url)

        if (isAdminCreation === false) {
            const jwToken = jwt.sign({ email: result.email, id: result._id, role: result.role }, 'test', { expiresIn: "1h" });
            res.status(200).json({ result: result, jwToken });
        } else {
            res.status(200).json({ result: result });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
}

export const verify = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await User.findOne({ _id: id });
        if (!user) return res.status(400).send({ message: "invalid link" });
        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token
        });
        if (!token) return res.status(400).send({ message: "Invalid link" });
        user.verified = true;
        const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });

        res.status(200).json(updatedUser);

    } catch (error) {
        res.status(404).json({ message: error })

    }
}

export const signin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) return res.status(404).json({ message: 'User does not exist' });
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
        if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });

        if (!existingUser.verified) {
            let token = await Token.findOne({ userId: existingUser._id });
            if (!token) {

                const token = await new Token({
                    userId: existingUser._id,
                    token: crypto.randomBytes(32).toString("hex")
                }).save();
                const url = `${process.env.BASE_URL}users/${existingUser._id}/verify/${token.token}`
                await sendEmail(existingUser.email, "Verify Email", url)
            }
            return res.status(400).send({ message: "Email sent to your account, please verify" });
        }


        const token = jwt.sign({ email: existingUser.email, id: existingUser._id, role: existingUser.role }, 'test', { expiresIn: "1h" });
        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find()/* .sort({ dateAndTime: -1 }) */;
        res.status(200).json(users)
    } catch (error) {
        res.status(404).json({ message: error });

    }
}

export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        res.status(200).json(user)
        console.log(user)
    } catch (error) {
        res.status(404).json({ message: error });

    }
}


export const updateUser = async (req: Request, res: Response) => {
    const { id: _id } = req.params;
    const user = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No user with that id");
    const updatedUser = await User.findByIdAndUpdate(_id, { ...user, _id, name: `${user.firstName} ${user.lastName}` }, { new: true });
    res.json(updatedUser);
}

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send("No user with that id");
    await User.findByIdAndRemove(id);
    res.json({ message: "User deleted" });
}

