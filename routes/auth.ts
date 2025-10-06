
import type {IncomingMessage} from "http";
import { ServerResponse } from "http";
import {httpMethods} from "../models/api";
import { safeParse } from "valibot";
import { authSchema } from "../models/user";
import { parseBody } from "../utils/parseBody";
import { createUser } from "../models/user";
import { findUserByEmail } from "../models/user";
import { sign } from "jsonwebtoken";
import { config } from "../config";
import { validatePassword } from "../models/user";
import { addRevokeToken } from "../models/revokeToken";
import type { AuthenticatedRequest } from "../middleware/authentication";
import { removeToken } from "../models/user";

export const authRouter = async (req: IncomingMessage, res: ServerResponse) => {
  const {method, url} = req;
  if(url ==="/auth/register" && method === httpMethods.POST){
    const body = await parseBody(req);
    const result= safeParse(authSchema, body);
    if(result.issues){
        res.statusCode = 400;
        res.end(JSON.stringify(result.issues));
        return;
    }
    const {email, password} = body
    


    try {
        const user = await createUser(email, password);
        res.statusCode = 201;
        res.end(JSON.stringify(user));
        return;
    } catch (error) {
        res.statusCode = 500;
        res.end(JSON.stringify({ message: "Internal server error" }));
        return;
    }

}



if (url === "/auth/login" && method === httpMethods.POST){
    const body = await parseBody(req);
    const result= safeParse(authSchema, body);
    if(result.issues){
        res.statusCode = 400;
        res.end(JSON.stringify(result.issues));
        return;
    }

    const {email, password} = body;
    const user = await findUserByEmail(email);
    if(!user|| !(await validatePassword(email, password))){
        res.statusCode = 401;
        res.end(JSON.stringify({ message: "Invalid credentials" }));
        return;
    }

    const accessToken = sign(
        {id : user.id, email : user.email, role : user.role},
        config.jwtSecret,
        {expiresIn: "1h"}
    )
    const refreshToken = sign(
        {id : user.id},
        config.jwtRefreshSecret,
        {expiresIn: "1d"}
    )


    user.refreshToken = refreshToken;
    res.statusCode = 200;
    res.end(JSON.stringify({ accessToken, refreshToken }));
    return;
    
}



if(url === "/auth/logout" && method === httpMethods.POST){
    const token = req.headers["authorization"]?.split(" ")[1];
    if(token){
        addRevokeToken(token); 
        const formattedReq = req as AuthenticatedRequest;
        if(
            formattedReq.user &&
            typeof formattedReq.user === "object" && 
            "id" in formattedReq.user
        ){
            const result = removeToken(formattedReq.user.email);
            if(!result){
                res.statusCode = 401;
                res.end(JSON.stringify({ message: "Unauthorized" }));
                return;
            }
        }
        res.end(JSON.stringify({ message: "Logged out successfully" }));
        return;
    }
    res.statusCode = 401;
    res.end(JSON.stringify({ message: "No token provided" }));
    return;
}

res.statusCode = 404;
res.end(JSON.stringify({ message: "Not found" }));
return;

}