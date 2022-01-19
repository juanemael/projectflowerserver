'use strict'

import UserAccessObject from "./login_dao";
import {NextFunction, Request, Response} from "express";
import * as argon2 from "argon2";
import jwt from 'jsonwebtoken'
import {hash} from "argon2";

const UserAccess = new UserAccessObject()

export async function loginUser(req: Request,res: Response, next: NextFunction){
    try {
        let user = await UserAccess.loginUserFromSQL();

        res.json(user);

        // let result = await UserAccess.insertUser(req.body.email, req.body.username, req.body.password, req,body.confirm_password, req.body.age,salt)
    } catch(e) {
        console.log(e)
        res.send(e)
    }
}

