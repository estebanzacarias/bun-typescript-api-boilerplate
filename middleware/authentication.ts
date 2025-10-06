import type { JwtPayload } from "jsonwebtoken";
import { IncomingMessage } from "http";
import { isRevokedToken } from "../models/revokeToken";
import { config } from "../config";
import jwt from "jsonwebtoken";



export interface AuthenticatedRequest extends IncomingMessage {
    user?: JwtPayload | string;
}


export const authenticateToken = async (
    req: AuthenticatedRequest, 
    res: any,
): Promise<boolean> => {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];
    if (!token) {
         res.status(401).json({ message: "Unauthorized" });
         return false;
    }
    if(isRevokedToken(token)) {
        res.status(401).json({ message: "Unauthorized" });
        return false;
    }
   try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    return true;
   } catch (_error) {
    res.status(401).json({ message: "Unauthorized" });
    return false;
   }
}