import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import userService from './service';
import "dotenv/config";
import { errorFactory } from '../utils/errorFactory';
import { validator } from '../utils/validator';
import { userLoginSchema, userSignupSchema } from './types';

const signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        const isUserExist = await userService.findUser(email);
        if(isUserExist) throw errorFactory("User is Exist");

        validator(req, userSignupSchema);

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await userService.createUser({name, email, password: hashedPassword});
        if (!user) throw errorFactory("Server Error");

        const token = createToken(email, user.id);

        res.status(200).json({name: user.name, id: user.id, token: token});
    } catch(error) {
        next(error);
    }
}

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        validator(req, userLoginSchema);

        const user = await userService.findUser(email);
        if (!user) throw errorFactory("Wrong Email", 422);

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) throw errorFactory("Wrong Password", 422);

        const token = createToken(email, user.id);
        res.status(200).json({name: user.name, id: user.id, token: token});
      
    } catch(error) {
        next(error);
    }
  }

const createToken = (email: string, id: number) => {
    return jwt.sign({
        email: email,
        userId: id
    }, 
    process.env.SECRET_KEY as string
    )
}

export default {signUp, login};