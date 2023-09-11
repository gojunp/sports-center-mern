import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';

interface JwtPayload {
    id: string,
    role: string
}

interface RequestUserAuth extends Request {
    userId?: string,
    role?: string
}

const auth = async (req: RequestUserAuth, res: Response, next: NextFunction) => {
    try {
        const token = req?.headers?.authorization?.split(" ")[1];
        let decodedData;
        if (token) {
            decodedData = jwt.verify(token, 'test') as JwtPayload;
            req.userId = decodedData?.id;
            req.role = decodedData?.role;
        }
        next()
    } catch (err) {
        console.log(err);
    }
}

export default auth;