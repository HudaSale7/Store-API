import { Request, Response, NextFunction } from 'express';
import userService from './user.service';
import "dotenv/config";
import { validator } from '../utils/validator';
import { userLoginSchema, userSignupSchema } from './user.types';

const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        validator(req, userSignupSchema);
        
        const { userName, token } = await userService.register({name, email, password});

        res.status(200).json({userName: userName, token: token});
    } catch(error) {
        next(error);
    }
}

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        validator(req, userLoginSchema);

        const { userName, token } = await userService.login({email, password});

        res.status(200).json({userName: userName, token: token});
      
    } catch(error) {
        next(error);
    }
  }

export default {register, login};