import type { ServerResponse } from "http";
import type { IncomingMessage } from "http";
import { httpMethods } from "../models/api";
import { authenticateToken } from "../middleware/authentication";
import type { AuthenticatedRequest } from "../middleware/authentication";
import { 
    getAllCharacters, 
    getCharacterById, 
    characterSchema, 
    addCharacter, 
    updateCharacter, 
    deleteCharacter,
    type Character 
} from "../models/character";
import { safeParse } from "valibot";
import { authorizeRole } from "../middleware/authorization";
import { Role } from "../models/user";
import { parseBody } from "../utils/parseBody";
export const characterRouter = async (req: IncomingMessage, res: ServerResponse) => {
    const { method, url } = req;
    if (!await authenticateToken(req as AuthenticatedRequest, res)) {
        res.statusCode = 401;
        res.end(JSON.stringify({ message: "Unauthorized" }));
        return;
    }


    if (url === "/characters" && method === httpMethods.GET) {
        const characters = await getAllCharacters();
        res.statusCode = 200;
        res.end(JSON.stringify(characters));
        return;
    }
    if (url === "/characters" && method === httpMethods.GET) {
        const id = parseInt(url.split("/").pop() as string, 10);
        const character = await getCharacterById(id);
        if (!character) {
            res.statusCode = 404;
            res.end(JSON.stringify({ message: "Character not found" }));
            return;
        }
        res.statusCode = 200;
        res.end(JSON.stringify(character));
        return;
    }
    if (url === "/characters" && method === httpMethods.POST) {
        if (!(await authorizeRole(Role.ADMIN, Role.USER)(req as AuthenticatedRequest, res))) {
            res.statusCode = 403;
            res.end(JSON.stringify({ message: "Forbidden" }));
            return;
        }
        const body = await parseBody(req);
        const result = safeParse(characterSchema, body);
        if (result.issues) {
            res.statusCode = 400;
            res.end(JSON.stringify(result.issues));
            return;
        }
        const character: Character = body;
        addCharacter(character);


        res.statusCode = 201;
        res.end(JSON.stringify(character));
        return;
    }

    if (url?.startsWith("/characters/") && method === httpMethods.PATCH) {
        if (!(await authorizeRole(Role.ADMIN, Role.USER)(req as AuthenticatedRequest, res))) {
            res.statusCode = 403;
            res.end(JSON.stringify({ message: "Forbidden" }));
            return;
        }
        const id = parseInt(url.split("/").pop() as string, 10);
        const body = await parseBody(req);
        const character: Character = body;
        const updatedCharacter = updateCharacter(id, character);


        if(!updatedCharacter){
            res.statusCode = 404;
            res.end(JSON.stringify({ message: "Character not found" }));
            return;
        }
        res.statusCode = 200;
        res.end(JSON.stringify(updatedCharacter));
        return;
    }


    if(url?.startsWith("/characters/") && method === httpMethods.DELETE){
        if(!(await authorizeRole(Role.ADMIN, Role.USER)(req as AuthenticatedRequest, res))){
            res.statusCode = 403;
            res.end(JSON.stringify({ message: "Forbidden" }));
            return;
        }
        const id = parseInt(url.split("/").pop() as string, 10);
        const deleted = deleteCharacter(id);
        if(!deleted){
            res.statusCode = 404;
            res.end(JSON.stringify({ message: "Character not found" }));
            return;
        }
        res.statusCode = 200;
        res.end(JSON.stringify({ message: "Character deleted successfully" }));
        return;
    }

    res.statusCode = 404;
    res.end(JSON.stringify({ message: "Not found" }));
    return;
}